import '@arco-design/web-react/dist/css/arco.css';
import './global.css';

import { Inter } from 'next/font/google';
import Auth from '@/components/auth/auth';
import { MajorVersion } from '@/components/auth/major-version';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '组件库管理系统',
  description: '组件库管理系统'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth>
          <MajorVersion>{children}</MajorVersion>
        </Auth>
      </body>
    </html>
  );
}
