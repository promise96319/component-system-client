import { Layout } from '@/components';
import { BackTop } from '@/components/back-top/back-top';
import { Header } from '@/components/header/header';
import { AdminSidebar } from './_components';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header></Header>} sidebar={<AdminSidebar></AdminSidebar>}>
      {children}
      <BackTop></BackTop>
    </Layout>
  );
}
