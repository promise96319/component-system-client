'use client';

import Link from 'next/link';
import { Menu } from '@arco-design/web-react';

export function AdminSidebar() {
  return (
    <Menu>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">版本管理</Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">需求列表</Menu.Item>
      </Link>
      <Link href="/admin/changelog">
        <Menu.Item key="changelog">版本记录</Menu.Item>
      </Link>
      <Link href="/admin/account">
        <Menu.Item key="account">账号信息</Menu.Item>
      </Link>
    </Menu>
  );
}
