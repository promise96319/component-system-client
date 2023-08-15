import { Header, Layout, ComponentSidebar } from '@/components';
import { BackTop } from '@/components/arco';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar />}>
      {children}
      <BackTop></BackTop>
    </Layout>
  );
}
