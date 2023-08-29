'use client';

import { IconApps } from '@arco-design/web-react/icon';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import IconChangelog from '@/assets/admin/changelog.svg';
import IconDemand from '@/assets/admin/demand.svg';
import IconApi from '@/assets/docs/api.svg';
import IconDesign from '@/assets/docs/design.svg';
import IconDiscussion from '@/assets/docs/topic.svg';
import { Space, Tabs, TabPane } from '@/components/arco';

const tabsData = [
  { key: 'api', icon: <IconApi style={{ fontSize: 16 }} />, label: 'API 文档' },
  { key: 'design', icon: <IconDesign style={{ fontSize: 16 }} />, label: '设计规范' },
  { key: 'version-changelog', icon: <IconChangelog style={{ fontSize: 16 }} />, label: '版本变更' },
  { key: 'discussion', icon: <IconDiscussion style={{ fontSize: 16 }} />, label: '讨论区' },
  { key: 'demand', icon: <IconDemand style={{ fontSize: 16 }} />, label: '需求' }
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
                {tab.icon}
                <span>{tab.label}</span>
              </Space>
            </Link>
          }
        />
      ))}
    </Tabs>
  );
};
