'use client';

import './page.scss';

import { Layout, Typography, Select } from '@arco-design/web-react';
import editorThemeData from 'monaco-themes/themes/Monokai.json';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { Previewer } from '@/components/playground/previewer';

const MonacoEditor = dynamic(() => import('react-monaco-editor').then((mod) => mod.default), { ssr: false });
const { Header, Sider, Content } = Layout;

export default function Playground() {
  const styleName = 'playground';

  const [code, setCode] = useState(`
  import { Button, ButtonGroup } from '@qt/design';
  import React from 'react';
  export default class extends React.Component {
    render() {
      return (<Button>1111</Button>);
    }
  }
  `);

  // import { Button, ButtonGroup } from '@qt/design';
  // import React from 'react';
  // export default class extends React.Component {
  //   render() {
  //     return (
  //       <ButtonGroup wrap={true} size={['small', 'small']}>
  //         <Button type="primary">Primary Button</Button>
  //         <Button type="default">Default Button</Button>
  //         <Button type="danger">Danger Button</Button>
  //         <Button type="dashed">Dashed Button</Button>
  //         <Button type="text">Text Button</Button>
  //       </ButtonGroup>
  //     );
  //   }
  // }
  const [editorWidth, setEditorWidth] = useState<number>();

  return (
    <Layout className={styleName}>
      <Header className={`${styleName}-header`}>
        <Typography.Text className="m-0">Playground</Typography.Text>
        <Select prefix="当前版本" style={{ width: 240 }} options={[]}></Select>
      </Header>

      <Layout className={`${styleName}-main`}>
        <Sider
          resizeDirections={['right']}
          className={`${styleName}-editor`}
          width={editorWidth ?? '50%'}
          resizeBoxProps={{
            width: editorWidth,
            onMoving: (_e, { width }) => {
              setEditorWidth(width);
            }
          }}
        >
          <MonacoEditor
            width={editorWidth}
            className={`${styleName}-editor-root`}
            value={code}
            onChange={(value) => setCode(value)}
            language="typescript"
            options={{
              formatOnPaste: true,
              minimap: {
                enabled: false
              }
            }}
            theme="monokai"
            editorDidMount={(_editor, monaco) => {
              console.log('editorThemeData', editorThemeData);
              monaco.editor.defineTheme('monokai', editorThemeData as any);
              monaco.editor.setTheme('monokai');
            }}
          ></MonacoEditor>
        </Sider>
        <Content>
          <Previewer code={code}></Previewer>
        </Content>
      </Layout>
    </Layout>
  );
}
