'use client';

import './page.scss';

import { Descriptions, Message, Upload, Space } from '@arco-design/web-react';
import { IconEmail, IconIdcard, IconUser } from '@arco-design/web-react/icon';
import { UserAvatar } from '@/components';
import { useUser, useUpdateUser } from '@/services';
import { useUploadImage } from '@/services/file';
import { AdminContainer } from '../_components';

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

  return (
    <AdminContainer title="个人中心">
      <main className={styleName}>
        <section className={`${styleName}-section`}>
          <h2>基础信息</h2>

          <div className={`${styleName}-user`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={`${styleName}-user-bg`} src="/account/account-bg.png" alt="bg"></img>
            <div className={`${styleName}-user-avatar`}>
              <Upload fileList={[]} customRequest={handleUpdateAvatar} accept="image/*">
                <UserAvatar src={user?.avatar} size={64} style={{ borderRadius: 8 }}></UserAvatar>
              </Upload>
            </div>
            <div className={`${styleName}-user-info`}>
              <div className={`${styleName}-user-info-nickname`}>{user.nickname}</div>
              <div className={`${styleName}-user-info-name`}>{user.name}</div>
            </div>
          </div>
        </section>
        <section className={`${styleName}-section`}>
          <h2>更多信息</h2>

          <div className={`${styleName}-other`}>
            <Descriptions
              labelStyle={{ width: 88 }}
              data={[
                {
                  label: (
                    <Space>
                      <IconEmail style={{ fontSize: 16 }}></IconEmail>
                      邮箱
                    </Space>
                  ),
                  value: user.email
                },
                {
                  label: (
                    <Space>
                      <IconIdcard style={{ fontSize: 16 }}></IconIdcard>
                      ID
                    </Space>
                  ),
                  value: user.id
                },
                {
                  label: (
                    <Space>
                      <IconUser style={{ fontSize: 16 }}></IconUser>
                      角色
                    </Space>
                  ),
                  value: user.role
                }
              ]}
              column={1}
            ></Descriptions>
          </div>
        </section>
      </main>
    </AdminContainer>
  );
};

export default Page;
