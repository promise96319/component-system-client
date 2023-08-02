import { Layout, Header } from '@/components';
import { AdminSidebar } from '@/components/admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header></Header>} sidebar={<AdminSidebar></AdminSidebar>}>
      {children}
    </Layout>
  );
}
