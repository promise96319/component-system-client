import { cookies } from 'next/headers';
import { Layout } from '@/components';
import { BackTop } from '@/components/arco';
import { CodeDependency } from '@/components/code-runner';
import { Header } from '@/components/header/header';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';
import { ComponentSidebar } from './_components/component-sidebar/component-sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const majorVersion = Number(cookies().get('majorVersion')?.value);

  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion)] : [];
  const dependency = <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;

  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar></ComponentSidebar>}>
      {dependency}
      {children}
      <BackTop></BackTop>
    </Layout>
  );
}
