'use client';

import { Anchor, Button, Empty, Skeleton, Space, Tooltip } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { getProcessor } from 'bytemd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { codeRuntimePlugin } from '@/components/code-runner';
import { Viewer } from '@/components/code-runner/viewer';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { DocType, useDoc, useMajorVersion } from '@/services';
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
  const plugins = [gfm(), rehypeHead(), codeRuntimePlugin({ majorVersion: majorVersionNumber }), highlight()];

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
  }, [apiDocData]);

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
        className="mt-px-32"
        description={
          <Link href={`/editor/${apiDocData?.id}`}>
            <Button type="text">新建文档</Button>
          </Link>
        }
      ></Empty>
    );
  }

  return (
    <main className={styleName}>
      <div className={`${styleName}-content`}>
        <Space className={`${styleName}-actions`}>
          <Tooltip content="编辑文档">
            <Link href={`/editor/${apiDocData?.id}`}>
              <Button shape="round" icon={<IconEdit></IconEdit>}></Button>
            </Link>
          </Tooltip>
          <HistoryButton id={apiDocData.id} componentId={componentId}></HistoryButton>
        </Space>
        <Viewer value={apiDocData.doc.content} plugins={plugins}></Viewer>
      </div>
      <div className={`${styleName}-toc`}>
        <Anchor offsetTop={80}>
          {toc.map((item) => (
            <Anchor.Link
              href={`#${item.id}`}
              title={item.text}
              key={item.id}
              className={`${styleName}-markdown-toc-${item.level}`}
            ></Anchor.Link>
          ))}
        </Anchor>
      </div>
    </main>
  );
}
