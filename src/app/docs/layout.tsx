import { Header, Layout } from '@/components';
import { BackTop } from '@/components/arco';
import { ComponentSidebar } from '@/components/component-sidebar/component-sidebar';

export default function WebLayout(props: { children: React.ReactNode }) {
  return (
    <Layout header={<Header />} sidebar={<ComponentSidebar></ComponentSidebar>}>
      {props.children}
      <BackTop></BackTop>
    </Layout>
  );
}
