'use client';

import { CodeDependency, JSDependency, codeRuntimePlugin } from '@/components/code-runner';
import React, { useCallback } from 'react';
import { Editor } from '@bytemd/react';
import { useState } from 'react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { throttle } from 'lodash-es';
import doc from '@/mock/template.md';

import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import './page.scss';
import '@/styles/markdown.scss';

const code2 = `
\`\`\`
import  React from 'react';
import { Button, Modal } from '@qt/design';

export default () => {
  const a  = 'hee';
  return <Button onClick={() => Modal.confirm({ title: '点击提示？' })}>Hello World!</Button>
}
\`\`\`
`;

const code = `
\`\`\`
import  React from 'react';
import { Button, Modal } from '@qt/design';

export default class A extends React.Component {
  render() {
    const a  = 'hee';
    return <Button onClick={() => Modal.confirm({ title: '点击提示？' })}>Hello World!</Button>
  } 
}
\`\`\`
`;

export default function APIDoc() {
  const styleName = 'editor';
  const [value, setValue] = useState(`${doc}# Class \n ${code} \n # Function \n ${code2}`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    throttle((val: string) => setValue(val), 1000),
    []
  );

  const jsDependencies: JSDependency[] = [
    {
      module: 'esm',
      url: 'http://localhost:8080/dist/index.js',
      globalName: 'QtDesign',
      importName: '@qt/design'
    }
  ];

  return (
    <div className={styleName}>
      <header className={`${styleName}-header`}>头部内容 xxxx</header>

      <main className={`${styleName}-container`}>
        <CodeDependency cssDependencies={['http://localhost:8080/dist/index.css']} jsDependencies={jsDependencies} />

        <Editor
          mode="auto"
          value={value}
          onChange={handleChange}
          // TODO: 图片上传
          uploadImages={(files: any[]) => {
            return Promise.resolve([
              {
                title: 'guanghui',
                url: 'https://p3-passport.byteimg.com/img/user-avatar/7bfe5fcd764682d97401eae5d338c64e~100x100.awebp',
                alt: 'guanghui'
              }
            ]);
          }}
          plugins={[gfm(), codeRuntimePlugin({ jsDependencies }), highlight()]}
        />
      </main>
    </div>
  );
}
