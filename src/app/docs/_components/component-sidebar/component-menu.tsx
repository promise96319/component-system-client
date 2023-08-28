'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Menu, SubMenu, MenuItem, IconApps } from '@/components/arco';
import { Component } from '@/services/common';
import { ActiveLink } from './active-link';

export const ComponentMenu = (props: { components: Component[] }) => {
  const styleName = 'component-sidebar';
  const searchParams = useSearchParams();
  const { components } = props;
  const category = components.map((item) => item.category);

  return (
    <Menu defaultOpenKeys={category} defaultSelectedKeys={['通用', 'button']}>
      {(components ?? []).map((comp) => {
        return (
          <SubMenu
            key={comp.category}
            title={
              <div className={`${styleName}-category`}>
                <IconApps></IconApps>
                {comp.category}
              </div>
            }
          >
            {comp.components.map((item) => {
              return (
                <MenuItem key={item.componentId}>
                  <ActiveLink componentId={item.componentId}>
                    <Link
                      className={`${styleName}-component`}
                      href={`/docs/${item.componentId}/api?v=${searchParams.get('v')}`}
                    >
                      {item.description}
                    </Link>
                  </ActiveLink>
                </MenuItem>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
};
