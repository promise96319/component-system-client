'use client';

import { Anchor, Button, Skeleton } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { getProcessor } from 'bytemd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { codeRuntimePlugin } from '@/components/code-runner';
import { MemoizedViewer } from '@/components/code-runner/viewer';
import { Empty } from '@/components/empty/empty';
import { FloatButton } from '@/components/float-button/float-button';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { DocType, useDoc, useMajorVersion } from '@/services';
import { linkPlugin } from '@/utils/markdown-plugin';
import { rehypeHead, rehypeToc, TocItem } from '@/utils/markdown-toc-plugin';
import { HistoryButton } from '../_components/history-button';

import 'bytemd/dist/index.css';
import '@/styles/markdown.scss';
import './page.scss';

export default function APIDoc({ params }: { params: { componentId: string } }) {
  const styleName = 'api-doc';

  const { componentId } = params;
  const [majorVersionId] = useMajorVersionId();
  const { data: majorVersion } = useMajorVersion(majorVersionId);
  const { data: apiDocData, isLoading: isLoadingDoc } = useDoc({
    majorVersionId,
    componentId,
    type: DocType.API
  });
  const majorVersionNumber = Number(useSearchParams().get('v'));
  const plugins = [
    gfm(),
    linkPlugin(),
    mediumZoom(),
    rehypeHead(),
    codeRuntimePlugin({ majorVersion: majorVersionNumber }),
    highlight()
  ];
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!apiDocData || !apiDocData.doc) return;
    try {
      let toc: TocItem[] = [];
      getProcessor({
        plugins: [
          rehypeToc({
            onFinish(value) {
              toc = value;
            }
          })
        ]
      }).processSync(apiDocData.doc.content ?? '');
      setToc(toc);
    } catch (err) {
      console.log('Markdown 编译错误：', err);
    }
  }, [apiDocData?.doc?.content]);

  if (isLoadingDoc || !majorVersionId) {
    return (
      <div className={styleName}>
        <main className={`${styleName}-markdown-content`}>
          <Skeleton animation text={{ rows: 3, width: '60%' }} style={{ marginTop: 32 }}></Skeleton>
          <Skeleton animation text={{ rows: 3, width: '60%' }} style={{ marginTop: 32 }}></Skeleton>
          <Skeleton animation text={{ rows: 3, width: '60%' }} style={{ marginTop: 32 }}></Skeleton>
          <Skeleton animation text={{ rows: 3, width: '60%' }} style={{ marginTop: 32 }}></Skeleton>
        </main>
      </div>
    );
  }

  if (!apiDocData || !apiDocData.doc || !majorVersion) {
    return (
      <Empty
        style={{ marginTop: 148 }}
        description={
          <Link href={`/editor/${apiDocData?.id}`}>
            <Button type="primary">新建文档</Button>
          </Link>
        }
      ></Empty>
    );
  }

  return (
    <main className={styleName}>
      <div className={`${styleName}-content`}>
        <Link href={`/editor/${apiDocData?.id}`}>
          <FloatButton bottom={144} icon={<IconEdit></IconEdit>}>
            编辑文档
          </FloatButton>
        </Link>
        <HistoryButton id={apiDocData.id} componentId={componentId}></HistoryButton>
        <MemoizedViewer value={apiDocData.doc.content} plugins={plugins}></MemoizedViewer>
      </div>
      <div className={`${styleName}-toc`}>
        <Anchor offsetTop={80} boundary={120}>
          {toc.map((item) => (
            <Anchor.Link
              href={`#${item.id}`}
              title={item.text}
              key={item.id}
              className={`${styleName}-toc-${item.level}`}
            ></Anchor.Link>
          ))}
        </Anchor>
      </div>
    </main>
  );
}
