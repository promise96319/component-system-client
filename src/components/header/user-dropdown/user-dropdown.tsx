'use client';

import Image from 'next/image';
import { useUser } from '@/services';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { useTokenStorage } from '@/hooks';
import { useRouter } from 'next/navigation';

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
