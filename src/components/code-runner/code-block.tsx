'use client';

import 'highlight.js/styles/github.css';
import './styles/code-block.scss';

import { Button, Message, Space, Tooltip } from '@arco-design/web-react';
import highlight from '@bytemd/plugin-highlight';
import classNames from 'classnames';
import ClipboardJS from 'clipboard';
import { useState, useRef, useEffect, useMemo } from 'react';
import { utoa } from '@/utils/zlib';
import { IconCode, IconCommon, IconCopy } from '../arco';
import { MemoizedViewer } from './viewer';

export default function CodeBlock(props: { source: string; majorVersion?: number; children: React.JSX.Element }) {
  const styleName = 'code-block';

  const markdown = `\`\`\` tsx
${props.source}
\`\`\``;

  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const previewerRef = useRef<HTMLDivElement>(null);
  const clipboard = useRef<ClipboardJS | null>(null);
  const plugins = useMemo(() => [highlight()], []);

  useEffect(() => {
    if (btnRef.current) {
      clipboard.current = new ClipboardJS(btnRef.current, {
        text: () => props.source
      });
      clipboard.current?.on('success', () => {
        Message.success('复制成功');
      });
    }
    return clipboard.current?.destroy;
  }, [btnRef, props.source]);

  useEffect(() => {
    if (previewerRef.current && window.ReactDOM && props.children) {
      // 外部使用的是 React18，design 库使用对的是 React16
      window.ReactDOM.render(props.children, previewerRef.current);
    }
  }, [previewerRef, props.children]);

  const handleOpenPlayground = () => {
    const state = {
      code: props.source,
      version: props.majorVersion
    };
    window.open(`/playground#${utoa(JSON.stringify(state))}`);
  };

  return (
    <div className={styleName}>
      <div className={`${styleName}-previewer`} ref={previewerRef}></div>
      <Space className={`${styleName}-operations`}>
        <Tooltip content={visible ? '隐藏代码' : '显示代码'}>
          <Button
            type="secondary"
            size="small"
            shape="round"
            onClick={() => setVisible(!visible)}
            icon={<IconCode></IconCode>}
          ></Button>
        </Tooltip>
        <Tooltip content="复制代码">
          <Button size="small" shape="round" ref={btnRef} icon={<IconCopy></IconCopy>}></Button>
        </Tooltip>
        <Tooltip content="运行代码">
          <Button size="small" shape="round" onClick={handleOpenPlayground} icon={<IconCommon></IconCommon>}></Button>
        </Tooltip>
      </Space>
      {visible && (
        <div className={classNames(`${styleName}-source`, { visible })}>
          <MemoizedViewer value={markdown} plugins={plugins} />
        </div>
      )}
    </div>
  );
}
