'use client';

import { Button, Message } from '@arco-design/web-react';
import highlight from '@bytemd/plugin-highlight';
import { Viewer } from '@bytemd/react';
import classNames from 'classnames';
import ClipboardJS from 'clipboard';
import { useState, useRef, useEffect } from 'react';

import 'highlight.js/styles/github.css';
import './styles/code-block.scss';

export default function CodeBlock(props: { source: string; children: React.ReactNode }) {
  const styleName = 'code-block';

  const markdown = `
\`\`\` tsx
${props.source}
\`\`\`
`;

  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const clipboard = useRef<ClipboardJS | null>(null);

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

  return (
    <div className={styleName}>
      <div className={`${styleName}-previewer`}>{props.children}</div>
      <div className={`${styleName}-operations`}>
        <Button type="text" onClick={() => setVisible(!visible)}>
          {visible ? '隐藏代码' : '显示代码'}
        </Button>
        <Button ref={btnRef} type="text">
          复制代码
        </Button>
      </div>
      <div className={classNames(`${styleName}-source`, { visible })}>
        <Viewer value={markdown} plugins={[highlight()]} />
      </div>
    </div>
  );
}
