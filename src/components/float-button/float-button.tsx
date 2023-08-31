import './float-button.scss';

import { Button, ButtonProps } from '@arco-design/web-react';
import classNames from 'classnames';

export const FloatButton = (
  props: ButtonProps & {
    right?: number;
    bottom?: number;
  }
) => {
  const right = props.right ?? 24;
  const bottom = props.bottom ?? 24;

  const { className } = props;

  return (
    <Button
      size="large"
      shape="circle"
      {...props}
      style={{ right, bottom }}
      className={classNames('float-button', className, {
        hasText: props.children
      })}
    >
      <span className="float-button-children">{props.children}</span>
    </Button>
  );
};
