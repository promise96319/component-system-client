import { Header, Layout, ComponentSidebar } from '@/components';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar />}>
      {children}
    </Layout>
  );
}
