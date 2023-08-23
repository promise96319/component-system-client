'use client';
import classNames from 'classnames';

import { useSelectedLayoutSegment } from 'next/navigation';

export const ActiveLink = (props: { componentId: string; children: React.ReactNode }) => {
  const styleName = 'component-sidebar';
  const segment = useSelectedLayoutSegment();

  return (
    <div
      className={classNames({
        [`${styleName}-active`]: props.componentId === segment
      })}
    >
      {props.children}
    </div>
  );
};
