/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';
import ReactDom from 'react-dom';

export interface JSDependency {
  module?: 'esm' | 'umd';
  url: string;
  globalName: string;
  importName: string;
}

export const builtInJsDependencies: JSDependency[] = [
  {
    module: 'umd',
    url: 'http://ued.qingteng.cn:37022/library/lodash.umd.js',
    globalName: 'lodash',
    importName: 'lodash'
  },
  {
    module: 'umd',
    url: 'http://ued.qingteng.cn:37022/library/react16.umd.js',
    globalName: 'React',
    importName: 'react'
  },
  {
    module: 'umd',
    url: 'http://ued.qingteng.cn:37022/library/react-dom16.umd.js',
    globalName: 'ReactDOM',
    importName: 'react-dom'
  },
  {
    module: 'umd',
    url: 'http://ued.qingteng.cn:37022/library/dayjs.js',
    globalName: 'dayjs',
    importName: 'dayjs'
  }
];

export const getGlobalModuleName = (name: string) => {
  return `__global_module_${name}__`;
};

export const getModule = (name: string, module: 'esm' | 'umd' = 'esm') =>
  (window as any)[module === 'esm' ? getGlobalModuleName(name) : name];

// next.js 无法通过 link / metadata 加载远程 css
export const loadCss = (url: string) => {
  return new Promise((resolve, reject) => {
    const linkUrls = [].slice.call(document.querySelectorAll('link')).map((item: any) => item.href);
    if (linkUrls.includes(url)) return resolve(null);

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

export const loadJs = (dependency?: JSDependency) => {
  if (!dependency) return Promise.resolve(null);

  const { url, module } = dependency;
  const globalName = getGlobalModuleName(dependency.globalName);

  return new Promise((resolve) => {
    if (getModule(globalName, module)) return resolve(null);

    const scriptUrls = [].slice.call(document.querySelectorAll('script')).map((item: any) => item.src ?? item.id);
    if (scriptUrls.includes(url)) return resolve(null);

    const onLoad = () => resolve(null);
    const script = document.createElement('script');

    if (module === 'umd') {
      script.src = url;
      script.onload = onLoad;
      script.onerror = onLoad;
    }

    if (module === 'esm') {
      const onLoadCallbackKey = `__${globalName}_onload_callback__`;
      script.innerHTML = `
        import * as ${globalName} from '${url}';
        window.${globalName} = ${globalName};
        window.${onLoadCallbackKey}();
      `;
      script.type = 'module';
      script.id = url;
      (window as any)[onLoadCallbackKey] = onLoad;
    }

    document.head.appendChild(script);
  });
};

export const isDependenciesLoaded = (dependencies: JSDependency[] = []) => {
  return dependencies.every((dependency) => getModule(dependency.globalName, dependency.module));
};

export const createScripts = (dependencies: JSDependency[] = []) => {
  return (
    <>
      {dependencies.map((dependency) => {
        if (dependency.module === 'esm') {
          const { importName, url } = dependency;
          const globalName = getGlobalModuleName(dependency.globalName);

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
  dependencies = [
    ...builtInJsDependencies,
    ...dependencies,
    {
      module: 'umd',
      url: '',
      globalName: 'QtDesign',
      importName: '@qt/design'
    }
  ];

  const dependency = dependencies.find((dependency) => dependency.importName === name);
  if (!dependency) {
    throw new Error(`找不到模块： '${name}'`);
  }

  const { globalName } = dependency as JSDependency;
  return (window as any)[dependency.module === 'esm' ? getGlobalModuleName(globalName) : globalName];
};

export function CodeDependency(props: { jsDependencies?: JSDependency[]; cssDependencies?: string[] }) {
  props.cssDependencies?.forEach((url) => ReactDom.preload(url, { as: 'style' }));

  return (
    <div className="dependencies">
      {/* preload 只会进行样式加载，但是不会应用。link 放到头部，next.js 又不生效  */}
      {props.cssDependencies?.map((url, index) => (
        <link key={index} rel="stylesheet" href={url}></link>
      ))}
      {createScripts(builtInJsDependencies)}
      {createScripts(props.jsDependencies)}
    </div>
  );
}
