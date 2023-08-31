import './float-button.scss';
import { Button, ButtonProps } from '@arco-design/web-react';

export const FloatButton = (
  props: ButtonProps & {
    right?: number;
    bottom?: number;
  }
) => {
  const right = props.right ?? 24;
  const bottom = props.bottom ?? 24;

  return (
    <Button size="large" shape="circle" className="float-button" {...props} style={{ right, bottom }}>
      <span className="float-button-children">{props.children}</span>
    </Button>
  );
};
