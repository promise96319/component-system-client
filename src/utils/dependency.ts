import { JSDependency } from '@/components/code-runner';

export const getDesignHost = (version: number): string => {
  const isDev = process.env.IS_DESIGN_DEV === 'true' || process.env.NEXT_PUBLIC_IS_DESIGN_DEV === 'true';
  return isDev ? `http://ued.qingteng.cn:37022/qt-design/dev` : `http://ued.qingteng.cn:37022/qt-design/v${version}`;
};

export const getDesignJsDependency = (majorVersion: number): JSDependency => {
  return {
    module: 'umd',
    url: `${getDesignHost(majorVersion)}/index.umd.js`,
    globalName: 'QtDesign',
    importName: '@qt/design'
  };
};

export const getDesignCssDependency = (majorVersion: number): string => {
  return `${getDesignHost(majorVersion)}/index.css`;
};
