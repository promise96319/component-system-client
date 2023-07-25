/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Head from 'next/head';
import Script from 'next/script';

export interface CssDependency {
  type: 'css';
  url: string;
}

export interface JSDependency {
  type: 'js';
  module?: 'esm' | 'umd';
  url: string;
  globalName: string;
  importName: string;
}

export type CodeDependency = CssDependency | JSDependency;

export const codeDependencies: CodeDependency[] = [
  {
    type: 'css',
    url: 'http://localhost:8080/dist/index.css'
  },
  {
    type: 'js',
    module: 'esm',
    url: 'http://localhost:8080/dist/index.js',
    globalName: 'QtDesign',
    importName: '@qt/design'
  },
  {
    type: 'js',
    module: 'umd',
    url: 'https://unpkg.com/react@18/umd/react.development.js',
    globalName: 'React',
    importName: 'react'
  },
  {
    type: 'js',
    module: 'umd',
    url: 'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    globalName: 'ReactDOM',
    importName: 'react-dom'
  },
  {
    type: 'js',
    module: 'umd',
    url: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.9/dayjs.min.js',
    globalName: 'dayjs',
    importName: 'dayjs'
  }
];

export const loadCodeDependencyScripts = (dependencies: CodeDependency[] = codeDependencies) => {
  let cssDependencies: CssDependency[] = [];
  let jsDependencies: JSDependency[] = [];
  dependencies.forEach((dependency) => {
    if (dependency.type === 'js') {
      jsDependencies.push(dependency);
    } else if (dependency.type === 'css') {
      cssDependencies.push(dependency);
    }
  });

  return (
    <>
      <Head>
        {cssDependencies.map((dependency) => {
          return <link key={dependency.url} type="text/css" rel="stylesheet" href={dependency.url} />;
        })}
      </Head>
      {jsDependencies.map((dependency) => {
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

export const importCodeDependency = (
  name: JSDependency['importName'],
  dependencies: CodeDependency[] = codeDependencies
) => {
  const dependency = dependencies.find((dependency) => dependency.type === 'js' && dependency.importName === name);
  if (!dependency) {
    throw new Error(`Cannot find module '${name}'`);
  }

  const { globalName } = dependency as JSDependency;
  return (window as any)[globalName];
};
