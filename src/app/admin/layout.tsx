import Link from 'next/link';
import Header from '@/components/header/header';
import './layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header></Header>
      <div className="container">
        <div className="sidebar">
          <Link href="/admin/version-history">Version History</Link>
          <Link href="/admin/account">Account</Link>
        </div>
        {children}
      </div>
    </main>
  );
}
