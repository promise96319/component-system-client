import Image from 'next/image';
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
          <Image src="/logo.png" width={126} height={28} alt="logo" />
        </Link>
      </div>
      <div className={`${styleName}-rightContent`}>
        <VersionSelector />
        <UserDropDown />
      </div>
    </nav>
  );
};
