import { ComponentBanner } from '../_components/banner';

import './layout.scss';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const styleName = 'docs';

  return (
    <div className={styleName}>
      <div className={`${styleName}-banner`}>
        <ComponentBanner></ComponentBanner>
      </div>
      <div className={`${styleName}-content`}>{children}</div>
    </div>
  );
}
