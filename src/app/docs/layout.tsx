'use client';

import './layout.scss';
import Header from '@/app/_components/header/header';
import Sidebar from '@/app/_components/sidebar/sidebar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DocsLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const styleName = 'docs';
  const [majorVersionId, setMajorVersionId] = useState('');

  const handleSelectMajorVersion = (majorVersionId: string) => {
    setMajorVersionId(majorVersionId);
  };

  return (
    <div className={styleName}>
      <Header onVersionSelect={handleSelectMajorVersion} />
      <div className={`${styleName}-container`}>
        <Sidebar majorVersionId={majorVersionId} />
        <div>{children}</div>
      </div>
    </div>
  );
}
