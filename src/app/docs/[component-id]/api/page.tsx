'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/react';
import { CodeDependency, JSDependency, codeRuntimePlugin } from '@/components/code-runner';
import { rehypeHead, rehypeToc, TocItem } from '@/utils/markdown-toc-plugin';
import { getProcessor } from 'bytemd';
import { Anchor } from '@arco-design/web-react';
import doc from '@/mock/template.md';

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

  // const params = useParams();
  const [toc, setToc] = useState<TocItem[]>([]);

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

  return (
    <div className={styleName}>
      <main className={`${styleName}-markdown`}>
        <div className={`${styleName}-markdown-content`}>
          <CodeDependency cssDependencies={['http://localhost:8080/dist/index.css']} jsDependencies={jsDependencies} />
          <Viewer value={doc} plugins={[codeRuntimePlugin({ jsDependencies }), rehypeHead(), highlight()]}></Viewer>
        </div>
        <div className={`${styleName}-markdown-toc`}>
          <Anchor>
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
