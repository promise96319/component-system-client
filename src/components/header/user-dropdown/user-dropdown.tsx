'use client';

import Image from 'next/image';
import { useUser } from '@/services';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { useTokenStorage } from '@/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import './user-dropdown.scss';

const styleName = 'user-dropdown';

const UserDropDown = () => {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const [_, setToken] = useTokenStorage();

  if (isLoading || !user) {
    return null;
  }

  const handleLogout = () => {
    setToken();
    router.replace('/auth/login');
  };

  const dropList = (
    <Menu>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">版本管理</Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">需求列表</Menu.Item>
      </Link>
      <Link href="/admin/changelog">
        <Menu.Item key="changelog">版本记录</Menu.Item>
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
    <div className={styleName}>
      <Image width={32} height={32} src={'/logo.png'} alt="" />
      <Dropdown droplist={dropList} trigger="click">
        <span className={`${styleName}-name`}>
          {user.nickname} <IconDown />
        </span>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
