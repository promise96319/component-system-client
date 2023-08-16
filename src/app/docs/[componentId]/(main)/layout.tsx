import './layout.scss';

export default function DocsLayout({ children, banner }: { children: React.ReactNode; banner: React.ReactNode }) {
  const styleName = 'docs';
  return (
    <div className={styleName}>
      <div className={`${styleName}-banner`}>{banner}</div>
      <div className={`${styleName}-content`}>{children}</div>
    </div>
  );
}
