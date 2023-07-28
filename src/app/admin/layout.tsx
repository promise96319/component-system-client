import { Layout, Header } from '@/components';
import { SideBar } from './_components/sidebar/sidebar';

import './layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout header={<Header></Header>} sidebar={<SideBar></SideBar>}>
      {children}
    </Layout>
  );
}
