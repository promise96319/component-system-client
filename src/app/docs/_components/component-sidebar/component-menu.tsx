'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import { Menu, SubMenu, MenuItem, IconApps } from '@/components/arco';
import { Component } from '@/services/common';

export const ComponentMenu = (props: { components: Component[] }) => {
  const styleName = 'component-sidebar';
  const searchParams = useSearchParams();
  const { components } = props;
  const category = components.map((item) => item.category);
  const segment = useSelectedLayoutSegment();

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
                <div
                  className={classNames({
                    [`${styleName}-active`]: item.componentId === segment
                  })}
                  key={item.componentId}
                >
                  <Link href={`/docs/${item.componentId}/api?v=${searchParams.get('v')}`}>
                    <MenuItem key={item.componentId}>
                      <span className={`${styleName}-component`}>{item.description}</span>
                    </MenuItem>
                  </Link>
                </div>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
};
