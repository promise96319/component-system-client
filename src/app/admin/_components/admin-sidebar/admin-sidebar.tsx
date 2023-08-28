'use client';

import { Menu, Space } from '@arco-design/web-react';
import { IconApps } from '@arco-design/web-react/icon';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import './admin-sidebar.scss';

export function AdminSidebar() {
  const styleName = 'admin-sidebar';
  const segment = useSelectedLayoutSegment();

  return (
    <Menu defaultSelectedKeys={segment ? [segment] : []} className={styleName}>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">
          <Space size={12}>
            <IconApps></IconApps>
            版本管理
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">
          <Space size={12}>
            <IconApps></IconApps>
            需求列表
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/version-changelog">
        <Menu.Item key="version-changelog">
          <Space size={12}>
            <IconApps></IconApps>
            版本记录
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/account">
        <Menu.Item key="account">
          <Space size={12}>
            <IconApps></IconApps>
            账号信息
          </Space>
        </Menu.Item>
      </Link>
    </Menu>
  );
}
