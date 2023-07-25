import Link from 'next/link';
import './header.scss';

const Header = () => {
  return (
    <nav>
      公共头部
      <Link href="/docs/button/api">文档界面</Link>
      <Link href="/admin/account">管理界面</Link>
    </nav>
  );
};

export default Header;
