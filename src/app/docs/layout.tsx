import { Layout } from '@/components';
import { BackTop } from '@/components/back-top/back-top';
import { Header } from '@/components/header/header';
import { ComponentSidebar } from './_components/component-sidebar/component-sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar></ComponentSidebar>}>
      {children}
      <BackTop></BackTop>
    </Layout>
  );
}
