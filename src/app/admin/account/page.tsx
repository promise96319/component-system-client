'use client';

import { Descriptions, Message, Upload } from '@arco-design/web-react';
import { UserAvatar } from '@/components';
import { useUser, useUpdateUser } from '@/services';
import { useUploadImage } from '@/services/file';
import { AdminContainer } from '../_components';

import './page.scss';

const Page = () => {
  const styleName = 'account';

  const { data: user, mutate } = useUser();
  const { trigger: uploadImage } = useUploadImage();
  const { trigger: updateUser } = useUpdateUser(user?.id);

  if (!user) {
    return null;
  }

  const handleUpdateAvatar = async (option: any) => {
    const { file, onSuccess, onError } = option;

    const res = await uploadImage({ file });

    if (res?.url) {
      await updateUser({ avatar: res.url });

      Message.success('更新头像成功');
      mutate({ ...user, avatar: res.url });
      onSuccess('更新成功');
      return;
    }
    onError('更新失败');
  };

  const imageElement = (
    <Upload fileList={[]} customRequest={handleUpdateAvatar} accept="image/*">
      <UserAvatar src={user?.avatar}></UserAvatar>
    </Upload>
  );

  return (
    <AdminContainer title="个人中心">
      <main className={styleName}>
        <Descriptions
          border
          data={[
            { label: '用户头像', value: imageElement },
            { label: '用户名', value: user.nickname },
            { label: '邮箱', value: user.email },
            { label: 'ID', value: user.id },
            { label: '角色', value: user.role }
          ]}
          column={1}
        ></Descriptions>
      </main>
    </AdminContainer>
  );
};

export default Page;
