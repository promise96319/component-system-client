'use client';

import { Anchor, Button } from '@arco-design/web-react';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/react';
import { getProcessor } from 'bytemd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CodeDependency, JSDependency, codeRuntimePlugin } from '@/components/code-runner';
import doc from '@/mock/template.md';
import { rehypeHead, rehypeToc, TocItem } from '@/utils/markdown-toc-plugin';

import 'bytemd/dist/index.css';
import '@/styles/markdown.scss';
import './page.scss';

const jsDependencies: JSDependency[] = [
  {
    module: 'esm',
    url: 'http://localhost:8080/dist/index.js',
    globalName: 'QtDesign',
    importName: '@qt/design'
  }
];

export default function APIDoc() {
  const styleName = 'api-doc';

  const { componentId } = useParams();
  const [toc, setToc] = useState<TocItem[]>([]);
  const router = useRouter();

  useEffect(() => {
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
      }).processSync(doc);
      setToc(toc);
    } catch (err) {
      console.log('Markdown 编译错误：', err);
    }
  }, []);

  const handleEdit = () => {
    router.push(`/editor/${componentId}`);
  };

  return (
    <div className={styleName}>
      <main className={`${styleName}-markdown`}>
        <div className={`${styleName}-markdown-content`}>
          <Button.Group>
            <Button type="text" onClick={handleEdit}>
              编辑
            </Button>
            <Button type="text">历史记录</Button>
          </Button.Group>
          <CodeDependency cssDependencies={['http://localhost:8080/dist/index.css']} jsDependencies={jsDependencies} />
          <Viewer value={doc} plugins={[codeRuntimePlugin({ jsDependencies }), rehypeHead(), highlight()]}></Viewer>
        </div>
        <div className={`${styleName}-markdown-toc`}>
          <Anchor offsetTop={80}>
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
    </div>
  );
}
