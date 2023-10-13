import '@arco-design/web-react/dist/css/arco.css';
import './global.css';

import { Inter } from 'next/font/google';
import { Auth } from '@/components/auth/auth';
import { DesignDependency } from './editor/_components/dependency';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | 组件库管理系统',
    default: '组件库管理系统'
  },
  description: '组件库管理系统'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <body className={inter.className}>
        <Auth>
          {/* https://nextjs.org/docs/pages/api-reference/components/script */}
          <DesignDependency></DesignDependency>
          {children}
        </Auth>
      </body>
    </html>
  );
}
