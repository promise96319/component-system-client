import { headers } from 'next/headers';
import { MajorVersion, Component } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { getQuery } from '@/utils/header';
import { ComponentMenu } from './component-menu';

import './component-sidebar.scss';

export const ComponentSidebar = async () => {
  const styleName = 'component-sidebar';
  const headerList = headers();
  const searchParams = getQuery(headerList);

  const majorVersion = await serverFetch<MajorVersion>(`/major-version/version/${searchParams.v}`);
  const components = await serverFetch<Component[]>(`/component`, {
    query: {
      majorVersionId: majorVersion.id
    }
  });

  return (
    <div className={styleName}>
      <ComponentMenu components={components}></ComponentMenu>
    </div>
  );
};
