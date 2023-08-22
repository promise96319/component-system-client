import { JSDependency } from '@/components/code-runner';

export const getDesignJsDependency = (majorVersion: number): JSDependency => {
  return {
    module: 'umd',
    url: `http://ued.qingteng.cn:37022/qt-design/v${majorVersion}/index.umd.js`,
    globalName: 'QtDesign',
    importName: '@qt/design'
  };
};

export const getDesignCssDependency = (majorVersion: number): string => {
  return `http://ued.qingteng.cn:37022/qt-design/v${majorVersion}/index.css`;
};
