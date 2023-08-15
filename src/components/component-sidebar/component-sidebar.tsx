'use client';

import { Skeleton } from '@arco-design/web-react';
import classNames from 'classnames';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useComponents } from '@/services';

import './component-sidebar.scss';

export const ComponentSidebar = () => {
  const styleName = 'component-sidebar';

  const [majorVersionId] = useMajorVersionId();
  const { data: components = [], isLoading } = useComponents(majorVersionId ?? '');
  const params = useParams();

  if (isLoading || !majorVersionId) {
    return (
      <div style={{ padding: '24px' }}>
        <Skeleton animation text={{ rows: 3, width: ['80%'] }} style={{ marginBottom: 32 }}></Skeleton>
        <Skeleton animation text={{ rows: 3, width: ['80%'] }}></Skeleton>
      </div>
    );
  }

  return (
    <div className={styleName}>
      {components.map((comp) => {
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
