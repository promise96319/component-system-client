import { getComponents } from '@/services';
import { Component } from '@/services/common/type';
import { useEffect, useState } from 'react';
import './sidebar.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const styleName = 'sidebar';

interface SidebarProps {
  majorVersionId: string;
}

const Sidebar = ({ majorVersionId }: SidebarProps) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [activeComponent, setActiveComponent] = useState('');
  const pathname = usePathname();

  const fetchComponents = async () => {
    const res = await getComponents(majorVersionId);
    if (res.code === 200) {
      setComponents(res.data);
    }
  };

  useEffect(() => {
    majorVersionId && fetchComponents();
  }, [majorVersionId]);

  useEffect(() => {
    const component = pathname.split('/')[2];
    setActiveComponent(component);
  }, [pathname]);

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
                    active: activeComponent === item.componentId
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
