'use client';

import { Button, Message } from '@arco-design/web-react';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/react';
import classNames from 'classnames';
import ClipboardJS from 'clipboard';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useMajorVersion } from '@/services';
import { utoa } from '@/utils/zlib';

import 'highlight.js/styles/github.css';
import './styles/code-block.scss';

export default function CodeBlock(props: { source: string; children: React.JSX.Element }) {
  const styleName = 'code-block';

  const markdown = `
\`\`\` tsx
${props.source}
\`\`\`
`;

  const [majorVersionId] = useMajorVersionId();
  const { data: majorVersion } = useMajorVersion(majorVersionId);
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
      version: majorVersion?.majorVersion
    };
    window.open(`/playground#${utoa(JSON.stringify(state))}`);
  };

  return (
    <div className={styleName}>
      <div className={`${styleName}-previewer`} ref={previewerRef}></div>
      <div className={`${styleName}-operations`}>
        <Button type="text" onClick={() => setVisible(!visible)}>
          {visible ? '隐藏代码' : '显示代码'}
        </Button>
        <Button ref={btnRef} type="text">
          复制代码
        </Button>
        <Button type="text" onClick={handleOpenPlayground}>
          运行代码
        </Button>
      </div>
      {visible && (
        <div className={classNames(`${styleName}-source`, { visible })}>
          <Viewer value={markdown} plugins={plugins} />
        </div>
      )}
    </div>
  );
}
