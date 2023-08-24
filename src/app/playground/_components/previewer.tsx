'use client';

import { useEffect, useRef, createElement } from 'react';
import { transform } from 'sucrase';
import templateHtml from './template.html';

import './previewer.scss';

export const Previewer = (props: { code: string; version?: number }) => {
  const styleName = 'playground-previewer';
  const { code, version = 3 } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const desingDependency = {
    css: `http://ued.qingteng.cn:37022/qt-design/v${version}/index.css`,
    js: `http://ued.qingteng.cn:37022/qt-design/v${version}/index.umd.js`
  };

  const updateCode = () => {
    try {
      const compiledCode: string = transform(code, {
        transforms: ['jsx', 'typescript', 'imports']
      })?.code;
      iframeRef.current?.contentWindow?.postMessage({ compiledCode });
    } catch (error: any) {
      iframeRef.current?.contentWindow?.postMessage({ error });
    }
  };

  useEffect(() => {
    updateCode();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      className={styleName}
      sandbox="allow-same-origin allow-scripts"
      srcDoc={templateHtml
        .replace('__QT_DESIGN_CSS_DEPENDENCY__', desingDependency.css)
        .replace('__QT_DESIGN_JS_DEPENDENCY__', desingDependency.js)}
      onLoad={updateCode}
    ></iframe>
  );
};
