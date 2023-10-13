'use client';

import { Dropdown, Menu, Skeleton, Space } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconAccount from '@/assets/admin/account.svg';
import IconChangelog from '@/assets/admin/changelog.svg';
import IconDemand from '@/assets/admin/demand.svg';
import IconLogout from '@/assets/admin/logout.svg';
import IconVersion from '@/assets/admin/version.svg';
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
    <Menu className={`${styleName}-menu`}>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">
          <Space>
            <IconVersion style={{ fontSize: 18 }}></IconVersion>
            版本管理
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">
          <Space>
            <IconDemand style={{ fontSize: 18 }}></IconDemand>
            需求列表
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/version-changelog">
        <Menu.Item key="version-changelog">
          <Space>
            <IconChangelog style={{ fontSize: 18 }}></IconChangelog>
            版本变更
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/account">
        <Menu.Item key="account">
          <Space>
            <IconAccount style={{ fontSize: 18 }}></IconAccount>
            个人中心
          </Space>
        </Menu.Item>
      </Link>
      <Menu.Item key="logout" onClick={handleLogout}>
        <Space>
          <IconLogout style={{ fontSize: '18px' }}></IconLogout>
          退出登录
        </Space>
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
