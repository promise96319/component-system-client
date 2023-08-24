'use client';

import './page.scss';

import { Layout, Typography, Select, ResizeBox } from '@arco-design/web-react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMajorVersions } from '@/services';
import { normalizeTreeData } from '@/utils';
import { utoa, atou } from '@/utils/zlib';
import { Editor } from './_components/editor';
import { Previewer } from './_components/previewer';

const { Header, Content } = Layout;

interface PersistentState {
  version: number;
  code: string;
}

const encodeState = (state: PersistentState) => {
  return utoa(JSON.stringify(state));
};

const decodeState = (state: string) => {
  try {
    return JSON.parse(atou(state)) as PersistentState;
  } catch {
    return null;
  }
};

export default function Playground() {
  const styleName = 'playground';

  const defaultCode = `
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';
export default class extends React.Component {
render() {
return (<Button>按钮</Button>);
}
}`;
  const [code, setCode] = useState(defaultCode);
  const [isDragging, setIsDragging] = useState(false);
  const [stretchRatio, setStretchRatio] = useState<number>(0.5);
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const { data: majorVersions } = useMajorVersions();
  const [version, setVersion] = useState<number>(3);

  const handleUpdateUrl = ({ code, version }: PersistentState) => {
    history.replaceState({}, '', `#${encodeState({ code, version: version ?? 3 })}`);
  };

  useEffect(() => {
    const persistentStateStr = typeof window === 'undefined' ? '' : window?.location?.hash.replace('#', '');
    const persistentState: PersistentState | null = persistentStateStr ? decodeState(persistentStateStr) : null;

    setCode(persistentState?.code ?? defaultCode);
    setVersion(persistentState?.version ?? 3);
    if (!persistentState) {
      handleUpdateUrl({ code: defaultCode, version: 3 });
    }
  }, []);

  useEffect(() => {
    const resizeHandler = debounce(() => setTotalWidth(document.body.offsetWidth), 300);
    setTotalWidth(document.body.offsetWidth);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Layout className={styleName}>
      <Header className={`${styleName}-header`}>
        <Link href="/">
          <Typography.Text className="m-0">Playground</Typography.Text>
        </Link>
        {version && (
          <Select
            prefix="当前版本"
            style={{ width: 240 }}
            defaultValue={version}
            onChange={(val) => {
              setVersion(val);
              handleUpdateUrl({ code, version: val });
            }}
            options={normalizeTreeData(majorVersions, { label: 'majorVersion', value: 'majorVersion' })}
          ></Select>
        )}
      </Header>

      <Content className={`${styleName}-main`}>
        <ResizeBox.Split
          direction="horizontal"
          style={{ width: '100%', height: '100%' }}
          max={0.7}
          min={0.3}
          onMoving={(_, size) => setStretchRatio(size as number)}
          onMovingStart={() => setIsDragging(true)}
          onMovingEnd={() => setIsDragging(false)}
          panes={[
            <div key="editor" className={classNames(`${styleName}-editor`, { dragging: isDragging })}>
              <Editor
                width={stretchRatio * totalWidth}
                code={code}
                onChange={(val) => {
                  setCode(val);
                  handleUpdateUrl({ code: val, version });
                }}
              ></Editor>
            </div>,
            <div key="previewer" className={classNames(`${styleName}-previewer`, { dragging: isDragging })}>
              <Previewer code={code} version={version}></Previewer>
            </div>
          ]}
        />
      </Content>
    </Layout>
  );
}
