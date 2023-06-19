import Link from 'next/link';
import './layout.scss';
import { Suspense } from 'react';

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <div className="container">
      <div className="sidebar">
        <Link href="/docs/button/api">Button 按钮</Link>
        <Link href="/docs/icon/api">Icon 图标</Link>
      </div>

      <div>
        当前页面：{params.slug}
        <div className="tab">
          <Link href={`/docs/${params.slug}/api`}>API 文档</Link>
          <Link href={`/docs/${params.slug}/design`}>设计文档</Link>
        </div>
        -----------------
        {children}
      </div>
    </div>
  );
}
