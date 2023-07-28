'use client';

import { useMajorVersionId } from '@/hooks/use-major-version-id';
import './layout.scss';
import { Space, Tabs } from '@arco-design/web-react';
import Image from 'next/image';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useComponent } from '@/services';
import Link from 'next/link';

const TabPane = Tabs.TabPane;

const tabsData = [
  { key: 'api', icon: '/assets/link.svg', label: 'API文档' },
  { key: 'design', icon: '/assets/label.svg', label: '设计文档' },
  { key: 'changelog', icon: '/assets/file.svg', label: '版本记录' },
  { key: 'discussion', icon: '/assets/filter.svg', label: '讨论区' },
  { key: 'demand', icon: '/assets/user.svg', label: '需求' }
];

export default function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const styleName = 'docs';
  const router = useRouter();
  const [majorVersionId] = useMajorVersionId();
  const componentId = params.componentId;
  const { data: component } = useComponent(majorVersionId, componentId);
  const segment = useSelectedLayoutSegment() ?? 'api';

  const handleTabChange = (key: string) => {
    router.push(`/docs/${componentId}/${key}`);
  };

  return (
    <div className={styleName}>
      <div className={`${styleName}-banner`}>
        <div className={`${styleName}-banner-content`}>
          <h1>{component?.description}</h1>
          <div className={`${styleName}-banner-tab`}>
            <Tabs defaultActiveTab={segment} onChange={handleTabChange}>
              {tabsData.map((tab) => (
                <TabPane
                  key={tab.key}
                  title={
                    <Space size={4}>
                      <Image width={16} height={16} src={tab.icon} alt="" />
                      <span>{tab.label}</span>
                    </Space>
                  }
                />
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      <div className={`${styleName}-content`}>{children}</div>
    </div>
  );
}
