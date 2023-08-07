'use client';
import { useEffect, useRef } from 'react';
import { transform } from 'sucrase';
import templateHtml from './template.html';
import './previewer.scss';

export const Previewer = (props: { code: string }) => {
  const styleName = 'playground-previewer';
  const { code } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    try {
      const compiledCode: string = transform(code, {
        transforms: ['jsx', 'typescript', 'imports']
      })?.code;
      iframeRef.current?.contentWindow?.postMessage({ compiledCode });
    } catch (error: any) {
      console.log('error', error);
      // toddo 错误处理
    }
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      className={styleName}
      sandbox="allow-same-origin allow-scripts"
      srcDoc={templateHtml}
    ></iframe>
  );
};
