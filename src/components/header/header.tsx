import Image from 'next/image';
import Link from 'next/link';
import UserDropDown from './user-dropdown/user-dropdown';
import VersionSelector from './version-selector/version-selector';

import './header.scss';

export const Header = () => {
  const styleName = 'header';

  return (
    <nav className={styleName}>
      <Link href="/" className={`${styleName}-logo`}>
        <Image src="/logo.png" width={126} height={28} alt="logo" quality={100} priority={true} />
      </Link>
      <div className={`${styleName}-rightContent`}>
        <VersionSelector />
        <UserDropDown />
      </div>
    </nav>
  );
};
