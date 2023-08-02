'use client';

import { Descriptions } from '@arco-design/web-react';
import { AdminContainer } from '@/components/admin/admin-container/admin-container';
import { useUser } from '@/services';

import './page.scss';

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
