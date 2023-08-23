import Image from 'next/image';
// import { IconSearch } from '@arco-design/web-react/icon';
import Link from 'next/link';
import UserDropDown from './user-dropdown/user-dropdown';
import VersionSelector from './version-selector/version-selector';

import './header.scss';

export const Header = () => {
  const styleName = 'header';

  return (
    <nav className={styleName}>
      <div>
        <Link href="/">
          <Image src="/logo.png" width={100} height={24} alt="" />
        </Link>
        {/* <Input className={`${styleName}-search`} prefix={<IconSearch />} placeholder="搜索" /> */}
      </div>
      <div className={`${styleName}-rightContent`}>
        <VersionSelector />
        <UserDropDown />
      </div>
    </nav>
  );
};
