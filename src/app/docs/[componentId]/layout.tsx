import { Header, Layout } from '@/components';
import { BackTop } from '@/components/arco';

export default function WebLayout(props: { children: React.ReactNode; sidebar: React.ReactNode }) {
  return (
    <Layout header={<Header />} sidebar={props.sidebar}>
      {props.children}
      <BackTop></BackTop>
    </Layout>
  );
}
