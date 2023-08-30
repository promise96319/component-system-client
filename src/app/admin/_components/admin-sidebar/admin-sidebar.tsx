'use client';

import { Menu, Space } from '@arco-design/web-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import IconAccount from '@/assets/admin/account.svg';
import IconChangelog from '@/assets/admin/changelog.svg';
import IconDemand from '@/assets/admin/demand.svg';
import IconVersion from '@/assets/admin/version.svg';

import './admin-sidebar.scss';

export function AdminSidebar() {
  const styleName = 'admin-sidebar';
  const segment = useSelectedLayoutSegment();
  console.log('value', segment);

  return (
    <Menu selectedKeys={segment ? [segment] : []} className={styleName}>
      <Link href="/admin/version-manager">
        <Menu.Item key="version-manager">
          <Space size={12}>
            <IconVersion style={{ fontSize: 18 }}></IconVersion>
            版本管理
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/demand">
        <Menu.Item key="demand">
          <Space size={12}>
            <IconDemand style={{ fontSize: 18 }}></IconDemand>
            需求列表
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/version-changelog">
        <Menu.Item key="version-changelog">
          <Space size={12}>
            <IconChangelog style={{ fontSize: 18 }}></IconChangelog>
            版本变更
          </Space>
        </Menu.Item>
      </Link>
      <Link href="/admin/account">
        <Menu.Item key="account">
          <Space size={12}>
            <IconAccount style={{ fontSize: 18 }}></IconAccount>
            个人中心
          </Space>
        </Menu.Item>
      </Link>
    </Menu>
  );
}
