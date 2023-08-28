'use client';

import { IconApps } from '@arco-design/web-react/icon';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Space, Tabs, TabPane } from '@/components/arco';

const tabsData = [
  { key: 'api', icon: '/assets/link.svg', label: 'API 文档' },
  { key: 'design', icon: '/assets/label.svg', label: '设计规范' },
  { key: 'version-changelog', icon: '/assets/file.svg', label: '版本变更' },
  { key: 'discussion', icon: '/assets/filter.svg', label: '讨论区' },
  { key: 'demand', icon: '/assets/user.svg', label: '需求' }
];

export const ComponentNav = (props: { componentId: string }) => {
  const styleName = 'component-nav';
  const { componentId } = props;
  const segment = useSelectedLayoutSegments().slice(-1)[0];

  return (
    <Tabs defaultActiveTab={segment} className={styleName}>
      {tabsData.map((tab) => (
        <TabPane
          className={`${styleName}-item`}
          key={tab.key}
          title={
            <Link href={`/docs/${componentId}/${tab.key}`}>
              <Space size={4}>
                {/* <Image width={16} height={16} src={tab.icon} alt="" /> */}
                <IconApps></IconApps>
                <span>{tab.label}</span>
              </Space>
            </Link>
          }
        />
      ))}
    </Tabs>
  );
};
