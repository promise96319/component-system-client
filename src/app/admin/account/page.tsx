'use client';

import { Descriptions, Message, Upload } from '@arco-design/web-react';
import { UserAvatar } from '@/components';
import { AdminContainer } from '@/components/admin/admin-container/admin-container';
import { useUser, useUpdateUser } from '@/services';
import { useUploadImage } from '@/services/file';

const Page = () => {
  const { data: user, mutate } = useUser();
  const { trigger: uploadImage, error: uploadImageError } = useUploadImage();
  const { trigger: updateUser, error: updateUserError } = useUpdateUser(user?.id);

  if (!user) {
    return null;
  }

  const handleUpdateAvatar = async (option: any) => {
    const { file, onSuccess, onError } = option;

    const res = await uploadImage({ file });

    if (res?.url && !uploadImageError) {
      await updateUser({ avatar: res.url });

      if (!updateUserError) {
        Message.success('更新头像成功');
        mutate({ ...user, avatar: res.url });
        onSuccess('更新成功');
        return;
      }
    }
    onError('更新失败');
  };

  const imageElement = (
    <Upload fileList={[]} customRequest={handleUpdateAvatar}>
      <UserAvatar src={user?.avatar}></UserAvatar>
    </Upload>
  );

  return (
    <AdminContainer title="账号信息">
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
    </AdminContainer>
  );
};

export default Page;
