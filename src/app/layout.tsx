import './globals.scss';
import { Inter } from 'next/font/google';
import Header from './_components/header/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '组件库管理系统',
  description: '组件库管理系统'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
