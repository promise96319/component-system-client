import classNames from 'classnames';
import Link from 'next/link';
import { MajorVersion, Component } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';

import './component-sidebar.scss';

export const ComponentSidebar = async (props: {
  params: {
    componentId: string;
  };
  searchParams: {
    v: string;
  };
}) => {
  const styleName = 'component-sidebar';
  const { params, searchParams } = props;

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
                    active: params.componentId === item.componentId
                  })}
                  href={`/docs/${item.componentId}/api`}
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
