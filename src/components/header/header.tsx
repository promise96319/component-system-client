import Image from 'next/image';
// import { Input } from '@arco-design/web-react';
// import { IconSearch } from '@arco-design/web-react/icon';
import VersionSelector from './version-selector/version-selector';
import UserDropDown from './user-dropdown/user-dropdown';

import './header.scss';

export const Header = () => {
  const styleName = 'header';

  return (
    <nav className={styleName}>
      <div>
        <Image src="/logo.png" width={100} height={24} alt="" />
        {/* <Input className={`${styleName}-search`} prefix={<IconSearch />} placeholder="搜索" /> */}
      </div>
      <div className={`${styleName}-rightContent`}>
        <VersionSelector />
        <UserDropDown />
      </div>
    </nav>
  );
};
