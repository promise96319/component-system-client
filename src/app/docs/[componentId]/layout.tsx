import { cookies } from 'next/headers';
import { CodeDependency } from '@/components/code-runner';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';

import './layout.scss';

export default function DocsLayout({ children, banner }: { children: React.ReactNode; banner: React.ReactNode }) {
  const styleName = 'docs';
  const majorVersion = Number(cookies().get('majorVersion')?.value);

  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion)] : [];
  const dependency = <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;

  return (
    <div className={styleName}>
      {dependency}
      <div className={`${styleName}-banner`}>{banner}</div>
      <div className={`${styleName}-content`}>{children}</div>
    </div>
  );
}
