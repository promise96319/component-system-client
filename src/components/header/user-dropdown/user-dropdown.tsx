'use client';

import { Dropdown, Menu, Skeleton } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '@/components';
import { useCurrentUrl } from '@/hooks/use-redirect-url';
import { useUser } from '@/services';
import { useLogout } from '@/services/login';

import './user-dropdown.scss';

const styleName = 'user-dropdown';

const UserDropDown = () => {
  const { data: user, isLoading } = useUser();
  const { trigger: logout } = useLogout();

  const router = useRouter();
  const redirectUrl = useCurrentUrl();

  const handleLogout = async () => {
    const res = await logout(undefined);

    if (res) {
      router.replace(`/auth/login?redirect=${redirectUrl}`);
    }
  };

  const dropList = (
    <Menu>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">版本管理</Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">需求列表</Menu.Item>
      </Link>
      <Link href="/admin/version-changelog">
        <Menu.Item key="version-changelog">版本记录</Menu.Item>
      </Link>
      <Link href="/admin/account">
        <Menu.Item key="account">账号信息</Menu.Item>
      </Link>
      <Menu.Item key="logout" onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Skeleton loading={isLoading} image={{ shape: 'circle', size: 'small' }} text={{ rows: 0 }} animation>
      <Dropdown
        droplist={dropList}
        trigger="click"
        position="br"
        getPopupContainer={(node) => node.parentElement as HTMLElement}
      >
        <div className={styleName}>
          <UserAvatar src={user?.avatar}></UserAvatar>

          <span className={`${styleName}-name`}>
            {user?.nickname} <IconDown />
          </span>
        </div>
      </Dropdown>
    </Skeleton>
  );
};

export default UserDropDown;
