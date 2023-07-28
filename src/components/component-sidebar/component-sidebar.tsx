'use client';

import { useComponents } from '@/services';
import Link from 'next/link';
import classNames from 'classnames';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useParams } from 'next/navigation';

import './component-sidebar.scss';

export const ComponentSidebar = () => {
  const styleName = 'component-sidebar';

  const [majorVersionId] = useMajorVersionId();
  const { data: components = [], error } = useComponents(majorVersionId ?? '');
  const params = useParams();

  if (error) {
    return null;
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
