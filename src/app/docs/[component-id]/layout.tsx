'use client';

import './layout.scss';
import { Tabs } from '@arco-design/web-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TabPane = Tabs.TabPane;

const tabsData = [
  { key: 'api', icon: '/assets/link.svg', label: 'API文档' },
  { key: 'design', icon: '/assets/label.svg', label: '设计文档' },
  { key: 'changelog', icon: '/assets/file.svg', label: '版本记录' },
  { key: 'discussion', icon: '/assets/filter.svg', label: '讨论区' },
  { key: 'demand', icon: '/assets/user.svg', label: '需求' }
];

export default function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const styleName = 'docs-content';
  const router = useRouter();

  const handleTabChange = (key: string) => {
    router.push(`/docs/${params['component-id']}/${key}`);
  };

  return (
    <div className={styleName}>
      <div className={`${styleName}-banner`}>
        <h1>{params['component-id']}</h1>
        <div className="tab">
          <Tabs defaultActiveTab="api" onChange={handleTabChange}>
            {tabsData.map((tab) => (
              <TabPane
                key={tab.key}
                title={
                  <>
                    <Image width={16} height={16} src={tab.icon} alt="" style={{ marginRight: '4px' }} /> {tab.label}
                  </>
                }
              />
            ))}
          </Tabs>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
