import { Header, Layout, ComponentSidebar } from '@/components';

export default function DocsLayout({ children }: { children: React.ReactNode; params: any }) {
  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar />}>
      {children}
    </Layout>
  );
}
