'use client';

import Image from 'next/image';
import './header.scss';
import { Input } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import VersionSelector from './version-selector/version-selector';
import UserDropDown from './user-dropdown/user-dropdown';

const styleName = 'header';

interface HeaderProps {
  onVersionSelect: (marjorVersionId: string) => void;
}

const Header = ({ onVersionSelect }: HeaderProps) => {
  const handleSelect = (id: string) => {
    onVersionSelect(id);
  };

  return (
    <nav className={styleName}>
      <div>
        <Image src="/logo.png" width={100} height={24} alt="" />
        <Input className={`${styleName}-search`} prefix={<IconSearch />} placeholder="搜索" />
      </div>
      <div className={`${styleName}-rightContent`}>
        <VersionSelector onSelect={handleSelect} />
        <UserDropDown />
      </div>
    </nav>
  );
};

export default Header;
