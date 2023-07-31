import { Layout, Header } from '@/components';
import { AdminSidebar } from './_components/admin-sidebar/admin-sidebar';

import './layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header></Header>} sidebar={<AdminSidebar></AdminSidebar>}>
      {children}
    </Layout>
  );
}
