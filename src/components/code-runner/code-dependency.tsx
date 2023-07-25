'use client';

/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';
import { useEffect } from 'react';

export interface JSDependency {
  module?: 'esm' | 'umd';
  url: string;
  globalName: string;
  importName: string;
}

export const builtInJsDependencies: JSDependency[] = [
  {
    module: 'umd',
    url: 'https://unpkg.com/react@18/umd/react.development.js',
    globalName: 'React',
    importName: 'react'
  },
  {
    module: 'umd',
    url: 'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    globalName: 'ReactDOM',
    importName: 'react-dom'
  },
  {
    module: 'umd',
    url: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.9/dayjs.min.js',
    globalName: 'dayjs',
    importName: 'dayjs'
  }
];

// next.js 无法通过 link / metadata 加载远程 css
export const loadCss = (url: string) => {
  return new Promise((resolve, reject) => {
    const linkNodes = [].slice.call(document.querySelectorAll('link')).map((item: any) => item.href);
    if (linkNodes.includes(url)) return resolve(null);

    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    link.onload = () => {
      resolve(null);
    };
    link.onerror = (err) => {
      reject(err);
    };
  });
};

export const createScripts = (dependencies: JSDependency[] = []) => {
  return (
    <>
      {dependencies.map((dependency) => {
        if (dependency.module === 'esm') {
          const { importName, globalName, url } = dependency;

          return (
            <Script key={importName} id={importName} type="module" strategy="beforeInteractive">
              {`
                 import * as ${globalName} from '${url}';
                 window.${globalName} = ${globalName};
              `}
            </Script>
          );
        } else {
          return (
            <Script
              key={dependency.url}
              id={dependency.importName}
              src={dependency.url}
              strategy="beforeInteractive"
            ></Script>
          );
        }
      })}
    </>
  );
};

export const importCodeDependency = (name: JSDependency['importName'], dependencies: JSDependency[] = []) => {
  dependencies = [...builtInJsDependencies, ...dependencies];
  const dependency = dependencies.find((dependency) => dependency.importName === name);
  if (!dependency) {
    throw new Error(`Cannot find module '${name}'`);
  }

  const { globalName } = dependency as JSDependency;
  return (window as any)[globalName];
};

export function CodeDependency(props: { jsDependencies?: JSDependency[]; cssDependencies?: string[] }) {
  useEffect(() => {
    props.cssDependencies?.forEach((url) => loadCss(url));
  });

  return (
    <>
      {createScripts(builtInJsDependencies)}
      {createScripts(props.jsDependencies)}
    </>
  );
}
