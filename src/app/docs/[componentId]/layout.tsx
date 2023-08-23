import { cookies } from 'next/headers';
import { Header, Layout } from '@/components';
import { BackTop } from '@/components/arco';
import { CodeDependency } from '@/components/code-runner';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';
import { ComponentBanner } from './_components/banner';
import { ComponentSidebar } from './_components/component-sidebar/component-sidebar';

import './layout.scss';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const styleName = 'docs';
  const majorVersion = Number(cookies().get('majorVersion')?.value);

  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion)] : [];
  const dependency = <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;

  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar></ComponentSidebar>}>
      <div className={styleName}>
        {dependency}
        <div className={`${styleName}-banner`}>
          <ComponentBanner></ComponentBanner>
        </div>
        <div className={`${styleName}-content`}>{children}</div>
      </div>
      <BackTop></BackTop>
    </Layout>
  );
}
