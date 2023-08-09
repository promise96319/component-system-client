'use client';

import { Anchor, Button, Empty } from '@arco-design/web-react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/react';
import { getProcessor } from 'bytemd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CodeDependency, codeRuntimePlugin } from '@/components/code-runner';
import { DocHistory } from '@/components/doc-history/doc-history';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useDoc, useMajorVersion } from '@/services';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';
import { rehypeHead, rehypeToc, TocItem } from '@/utils/markdown-toc-plugin';

import 'bytemd/dist/index.css';
import '@/styles/markdown.scss';
import './page.scss';

export default function APIDoc() {
  const styleName = 'api-doc';

  const { componentId } = useParams();
  const [majorVersionId] = useMajorVersionId();
  const { data: majorVersion } = useMajorVersion(majorVersionId);
  const { data: apiDocData } = useDoc({
    majorVersionId,
    componentId,
    type: 'API'
  });

  const [toc, setToc] = useState<TocItem[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!apiDocData) return;
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
      }).processSync(apiDocData.doc.content);
      setToc(toc);
    } catch (err) {
      console.log('Markdown 编译错误：', err);
    }
  }, [apiDocData]);

  const handleEdit = () => {
    router.push(`/editor/${apiDocData?.id}`);
  };

  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion.majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion.majorVersion)] : [];
  const dependency = <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;

  if (!apiDocData || !majorVersion || !designJsDependency.length) {
    return (
      <>
        {dependency}
        <Empty className="mt-px-32"></Empty>
      </>
    );
  }

  return (
    <div className={styleName}>
      {dependency}
      <main className={`${styleName}-markdown`}>
        <div className={`${styleName}-markdown-content`}>
          <Button.Group>
            <Button type="text" onClick={handleEdit}>
              编辑
            </Button>
            <Button type="text" onClick={() => setIsHistoryVisible(true)}>
              历史记录
            </Button>
          </Button.Group>
          <Viewer
            value={apiDocData.doc.content}
            plugins={[gfm(), rehypeHead(), codeRuntimePlugin({ jsDependencies: designJsDependency }), highlight()]}
          ></Viewer>
        </div>
        <div className={`${styleName}-markdown-toc`}>
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

        <DocHistory
          id={apiDocData.id}
          visible={isHistoryVisible}
          onCancel={() => setIsHistoryVisible(false)}
        ></DocHistory>
      </main>
    </div>
  );
}
