import { Layout, Header } from '@/components';
import { AdminSidebar } from '@/components/admin/admin-sidebar/admin-sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header></Header>} sidebar={<AdminSidebar></AdminSidebar>}>
      {children}
    </Layout>
  );
}
