import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUser } from '@/services';
import './user-dropdown.scss';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { useRouter } from 'next/navigation';

const styleName = 'user-dropdown';

const UserDropDown = () => {
  const [avatar, setAvatar] = useState('/logo.png');
  const [name, setName] = useState();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const dropList = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getUser().then((res) => {
      if (res.code === 200) {
        const { name = 'username', avatar } = res.data;
        setAvatar(avatar);
        setName(name);
      }
    });
  }, []);

  return (
    <div className={styleName}>
      <Image width={32} height={32} src={avatar!} alt="" />
      <Dropdown droplist={dropList} trigger="click">
        <span className={`${styleName}-name`}>
          {name} <IconDown />
        </span>
      </Dropdown>
    </div>
  );
};

export default UserDropDown;
