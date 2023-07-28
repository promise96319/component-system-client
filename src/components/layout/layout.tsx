import './layout.scss';

export const Layout = (props: { header: React.ReactNode; sidebar: React.ReactNode; children: React.ReactNode }) => {
  const styleName = 'layout';

  return (
    <div className={styleName}>
      <nav className={`${styleName}-header`}>{props.header}</nav>
      <div className={`${styleName}-container`}>
        <div className={`${styleName}-sidebar`}>
          <div className={`${styleName}-sidebar-content`}>{props.sidebar}</div>
        </div>
        <main className={`${styleName}-main`}>{props.children}</main>
      </div>
    </div>
  );
};
