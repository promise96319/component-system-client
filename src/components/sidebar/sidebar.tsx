'use client';

import { useComponents } from '@/services';
import Link from 'next/link';
import classNames from 'classnames';
import { useMajorVersionId } from '@/hooks/use-major-version-id';

import './sidebar.scss';

const Sidebar = () => {
  const styleName = 'sidebar';

  const [majorVersionId] = useMajorVersionId();
  const { data: components = [], error } = useComponents(majorVersionId ?? '');

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
                  className={classNames(`${styleName}-comp`, {
                    // active: activeComponent === item.componentId
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

export default Sidebar;
