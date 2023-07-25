'use client';

import { CodeDependency, JSDependency, codeRuntimePlugin } from '@/components/code-runner';
import React, { useCallback } from 'react';
import { Editor } from '@bytemd/react';
import { useState } from 'react';
import gfm from '@bytemd/plugin-gfm';
import { throttle } from 'lodash-es';

import 'bytemd/dist/index.css';
import './page.scss';

const code = `
\`\`\`
import  React from 'react';
import { Button } from '@qt/design';

export default () => {
  const a  = 'hee';
  return <Button onClick={console.log}>Hello World!</Button>
}
\`\`\`
`;

export default function APIDoc() {
  const [value, setValue] = useState(code);

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
    <div className="editor">
      <header>头部内容 TODO:</header>

      <main className="editor-container">
        <CodeDependency
          cssDependencies={['http://localhost:8080/dist/index.css']}
          jsDependencies={jsDependencies}
        ></CodeDependency>

        <Editor
          mode="auto"
          value={value}
          onChange={handleChange}
          // TODO: 图片上传
          // uploadImages={(files: any[]) => {
          //   return Promise.resolve([
          //     {
          //       title: 'guanghui',
          //       url: 'https://p3-passport.byteimg.com/img/user-avatar/7bfe5fcd764682d97401eae5d338c64e~100x100.awebp',
          //       alt: 'guanghui'
          //     }
          //   ]);
          // }}
          plugins={[gfm(), codeRuntimePlugin({ jsDependencies })]}
        ></Editor>
      </main>
    </div>
  );
}
