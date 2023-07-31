import './admin-container.scss';

export const AdminContainer = (props: { children: React.ReactNode; title: React.ReactNode }) => {
  const styleName = 'admin-container';

  return (
    <div className={styleName}>
      <div className={`${styleName}-title`}>{props.title}</div>
      <div className={`${styleName}-content`}>{props.children}</div>
    </div>
  );
};
