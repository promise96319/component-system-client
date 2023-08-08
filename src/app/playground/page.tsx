'use client';

import './page.scss';

import { Layout, Typography, Select } from '@arco-design/web-react';
import editorThemeData from 'monaco-themes/themes/Monokai.json';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Previewer } from '@/components/playground/previewer';
import { useMajorVersions } from '@/services';
import { normalizeTreeData } from '@/utils';
import { utoa, atou } from '@/utils/zlib';

const MonacoEditor = dynamic(() => import('react-monaco-editor').then((mod) => mod.default), { ssr: false });
const { Header, Sider, Content } = Layout;

interface PersistentState {
  version: number;
  code: string;
}

const encodeState = (state: PersistentState) => {
  return btoa(JSON.stringify(state));
};

const decodeState = (state: string) => {
  try {
    return JSON.parse(atob(state)) as PersistentState;
  } catch {
    return null;
  }
};

export default function Playground() {
  const styleName = 'playground';
  const persistentStateStr = window?.location?.hash.replace('#', '');
  const persistentState = persistentStateStr ? decodeState(persistentStateStr) : null;
  console.log('persistentState', persistentState);

  const defaultCode = persistentState
    ? persistentState.code
    : `
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';
export default class extends React.Component {
  render() {
    return (<Button>1111</Button>);
  }
}
  `;

  const [code, setCode] = useState(defaultCode);
  const [editorWidth, setEditorWidth] = useState<number>();
  const { data: majorVersions } = useMajorVersions();
  const [version, setVersion] = useState<number>(persistentState?.version ?? 3);

  useEffect(() => {
    history.replaceState({}, '', `#${encodeState({ code, version })}`);
  }, [code, version]);

  return (
    <Layout className={styleName}>
      <Header className={`${styleName}-header`}>
        <Typography.Text className="m-0">Playground</Typography.Text>
        <Select
          prefix="当前版本"
          style={{ width: 240 }}
          value={version}
          // todo 切换依赖
          onChange={(val) => setVersion(val)}
          options={normalizeTreeData(majorVersions, { label: 'majorVersion', value: 'majorVersion' })}
        ></Select>
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
              monaco.editor.defineTheme('monokai', editorThemeData as any);
              monaco.editor.setTheme('monokai');
            }}
          ></MonacoEditor>
        </Sider>
        <Content>
          <Previewer code={code} version={version}></Previewer>
        </Content>
      </Layout>
    </Layout>
  );
}
