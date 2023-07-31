'use client';

import { useUser } from '@/services';
import { AdminContainer } from '../_components/admin-container/admin-container';
import './page.scss';
import { Descriptions } from '@arco-design/web-react';

const Page = () => {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <AdminContainer title="账号信息">
      <Descriptions
        border
        data={[
          { label: '用户名', value: user.nickname },
          { label: '邮箱', value: user.email },
          { label: '角色', value: user.role }
        ]}
        column={1}
      ></Descriptions>
    </AdminContainer>
  );
};

export default Page;
