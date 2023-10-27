import { cookies } from 'next/headers';
import { MajorVersion, Component } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { ComponentMenu } from './component-menu';

import './component-sidebar.scss';

export const ComponentSidebar = async () => {
  const styleName = 'component-sidebar';
  const majorVersionId = cookies().get('majorVersionId');
  const components = await serverFetch<Component[]>(`/component`, {
    query: { majorVersionId: majorVersionId?.value }
  });

  return (
    <div className={styleName}>
      <ComponentMenu components={components}></ComponentMenu>
    </div>
  );
};
