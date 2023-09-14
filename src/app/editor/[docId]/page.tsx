'use client';

import { Typography, Divider } from '@arco-design/web-react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { codeRuntimePlugin } from '@/components/code-runner';
import { MemoizedViewer } from '@/components/code-runner/viewer';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { DocType, useComponent, useLatestDocById } from '@/services';
import { useUploadImage } from '@/services/file';
import { linkPlugin } from '@/utils/markdown-plugin';
import { UpdateModal } from './_components/update-modal';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import './page.scss';
import '@/styles/markdown.scss';

export default function MarkdownEditor() {
  const styleName = 'markdown-editor';

  const [value, setValue] = useState('');
  const rootCache: React.RefObject<Record<any, Root>> = useRef({});
  const { docId } = useParams();
  const [majorVersionId] = useMajorVersionId();
  const majorVersion = useSearchParams().get('v');
  const plugins = useMemo(
    () => [gfm(), linkPlugin(), codeRuntimePlugin({ majorVersion: Number(majorVersion) }), highlight()],
    []
  );
  const { data: doc } = useLatestDocById(docId as string);
  const { data: component } = useComponent(majorVersionId, doc?.componentId);
  const { trigger: uploadImage } = useUploadImage();

  const redirectUrl = `/docs/${doc?.componentId}/${doc?.specType === DocType.API ? 'api' : 'design'}`;

  useEffect(() => {
    if (doc?.doc?.content) {
      setValue(doc.doc.content ?? '');
    }
  }, [doc?.doc?.content]);

  const handleChange = useCallback((val: string) => setValue(val), []);

  const handleUploadImage = useCallback(async (files: File[]) => {
    return Promise.all(
      files.map((file) => {
        return uploadImage({ file }).then((res) => {
          return {
            url: res?.url,
            alt: file.name,
            title: file.name
          };
        });
      })
    ) as any;
  }, []);

  return (
    <div className={styleName}>
      <header className={`${styleName}-header`}>
        <Link href={redirectUrl}>
          <Typography.Text className={`${styleName}-header-title`}>
            {doc?.specType && (doc.specType === DocType.API ? 'API 文档' : '设计规范')}
            <Divider type="vertical" />
            {component?.description}
          </Typography.Text>
        </Link>
        <UpdateModal
          value={value}
          doc={doc}
          docId={doc?.id ?? ''}
          redirectUrl={redirectUrl}
          majorVersionId={majorVersionId}
        ></UpdateModal>
      </header>

      <main className={`${styleName}-container`}>
        <Editor
          mode="auto"
          value={value}
          onChange={handleChange}
          uploadImages={handleUploadImage}
          previewDebounce={300}
          // 不重写 previewer 的时候，每次 editor 更新，viewer 随之更新。如果更新比较耗时，会阻塞导致卡顿。
          // todo: 为什么 bytemd 没有这种卡顿，是 svelte 的缘故吗？
          // https://github.com/bytedance/bytemd/blob/main/packages/bytemd/src/editor.svelte
          overridePreview={(el, props) => {
            let root = null;
            if (rootCache.current?.el) {
              root = rootCache.current?.el;
            } else {
              root = createRoot(el);
              if (rootCache.current) {
                rootCache.current.el = root;
              }
            }
            root.render(<MemoizedViewer {...props}></MemoizedViewer>);
          }}
          plugins={plugins}
        />
      </main>
    </div>
  );
}
