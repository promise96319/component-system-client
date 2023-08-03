'use client';

import { Menu } from '@arco-design/web-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export function AdminSidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <Menu selectedKeys={segment ? [segment] : []}>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">版本管理</Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">需求列表</Menu.Item>
      </Link>
      <Link href="/admin/version-changelog">
        <Menu.Item key="version-changelog">版本记录</Menu.Item>
      </Link>
      <Link href="/admin/account">
        <Menu.Item key="account">账号信息</Menu.Item>
      </Link>
    </Menu>
  );
}
