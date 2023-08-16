'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Space, Tabs, TabPane } from '@/components/arco';

const tabsData = [
  { key: 'api', icon: '/assets/link.svg', label: 'API文档' },
  { key: 'design', icon: '/assets/label.svg', label: '设计文档' },
  { key: 'version-changelog', icon: '/assets/file.svg', label: '版本记录' },
  { key: 'discussion', icon: '/assets/filter.svg', label: '讨论区' },
  { key: 'demand', icon: '/assets/user.svg', label: '需求' }
];

export const ComponentNav = (props: { componentId: string }) => {
  const { componentId } = props;

  return (
    <Tabs defaultActiveTab={componentId}>
      {tabsData.map((tab) => (
        <TabPane
          key={tab.key}
          title={
            <Link href={`/docs/${componentId}/${tab.key}`}>
              <Space size={4}>
                <Image width={16} height={16} src={tab.icon} alt="" />
                <span>{tab.label}</span>
              </Space>
            </Link>
          }
        />
      ))}
    </Tabs>
  );
};
