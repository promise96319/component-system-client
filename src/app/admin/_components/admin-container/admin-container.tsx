import classNames from 'classnames';
import './admin-container.scss';

export const AdminContainer = (props: { children: React.ReactNode; title: React.ReactNode; className?: string }) => {
  const styleName = 'admin-container';

  return (
    <div className={classNames(styleName, props.className)}>
      <div className={`${styleName}-title`}>{props.title}</div>
      <div className={`${styleName}-content`}>{props.children}</div>
    </div>
  );
};
