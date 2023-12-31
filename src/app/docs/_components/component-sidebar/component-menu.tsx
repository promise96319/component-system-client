'use client';

import { Tag } from '@arco-design/web-react';
import { IconExperiment } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import Link from 'next/link';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import IconData from '@/assets/sidebar/data.svg';
import IconFeedback from '@/assets/sidebar/feedback.svg';
import IconGeneral from '@/assets/sidebar/general.svg';
import IconInput from '@/assets/sidebar/input.svg';
import IconLayout from '@/assets/sidebar/layout.svg';
import IconNav from '@/assets/sidebar/nav.svg';
import IconOther from '@/assets/sidebar/other.svg';

import { Menu, SubMenu, MenuItem } from '@/components/arco';
import { Component } from '@/services/common';

export const ComponentMenu = (props: { components: Component[] }) => {
  const styleName = 'component-sidebar';
  const searchParams = useSearchParams();
  const { components = [] } = props;
  const category = components.map((item) => item.category);
  const segment = useSelectedLayoutSegment();

  const icons = [
    <IconGeneral key="general" style={{ fontSize: 18 }}></IconGeneral>,
    <IconLayout key="layout" style={{ fontSize: 18 }}></IconLayout>,
    <IconNav key="nav" style={{ fontSize: 18 }}></IconNav>,
    <IconInput key="input" style={{ fontSize: 18 }}></IconInput>,
    <IconData key="data" style={{ fontSize: 18 }}></IconData>,
    <IconFeedback key="feedback" style={{ fontSize: 18 }} />,
    <IconOther key="other" style={{ fontSize: 18 }} />,
    <IconExperiment key="experiment" style={{ fontSize: 18 }} />
  ];

  return (
    <Menu defaultOpenKeys={category} defaultSelectedKeys={segment ? [segment] : []}>
      {(components ?? []).map((comp, index) => {
        return (
          <SubMenu
            key={comp.category}
            title={
              <div className={`${styleName}-category`}>
                {icons[index]}
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
                      <span className={`${styleName}-component`}>
                        <span className={`${styleName}-component-description`}>{item.description}</span>
                        {item.isNew && (
                          <Tag className={`${styleName}-component-new`} color="green">
                            New
                          </Tag>
                        )}
                      </span>
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
