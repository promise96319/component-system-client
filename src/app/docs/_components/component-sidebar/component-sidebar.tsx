import classNames from 'classnames';
import { headers } from 'next/headers';
import Link from 'next/link';
import { MajorVersion, Component } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { getPath, getQuery } from '@/utils/header';
import { ActiveLink } from './active-link';

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
      {(components ?? []).map((comp) => {
        return (
          <div key={comp.category}>
            <div className={`${styleName}-category`}>{comp.category}</div>
            {comp.components.map((item) => {
              return (
                <ActiveLink key={item.componentId} componentId={item.componentId}>
                  <Link
                    className={`${styleName}-components`}
                    href={`/docs/${item.componentId}/api?v=${searchParams.v}`}
                  >
                    <span className={`${styleName}-comp-description`}>{item.description}</span>
                  </Link>
                </ActiveLink>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
