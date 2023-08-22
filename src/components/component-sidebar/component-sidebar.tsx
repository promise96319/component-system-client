import classNames from 'classnames';
import { headers } from 'next/headers';
import Link from 'next/link';
import { MajorVersion, Component } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { getPath, getQuery } from '@/utils/header';

import './component-sidebar.scss';

export const ComponentSidebar = async () => {
  const styleName = 'component-sidebar';
  const headerList = headers();
  const searchParams = getQuery(headerList);
  const paths = getPath(headerList) ?? '';
  const componentId = paths.split('/').slice(-2)[0];

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
                <Link
                  key={item.componentId}
                  className={classNames(`${styleName}-components`, {
                    active: componentId === item.componentId
                  })}
                  href={`/docs/${item.componentId}/api?v=${searchParams.v}`}
                >
                  <span className={`${styleName}-comp-description`}>{item.description}</span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
