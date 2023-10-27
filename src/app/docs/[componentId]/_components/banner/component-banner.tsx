import { cookies } from 'next/headers';
import Image from 'next/image';
import { ComponentDetail } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { ComponentNav } from './component-nav';

import './component-banner.scss';

export async function ComponentBanner({ componentId }: { componentId: string }) {
  const styleName = 'component-banner';

  const majorVersionId = cookies().get('majorVersionId');
  const component = await serverFetch<ComponentDetail>(`/component/${componentId}`, {
    query: {
      majorVersionId: majorVersionId?.value
    }
  });

  return (
    <div className={styleName}>
      <div className={`${styleName}-content`}>
        <h1 className={`${styleName}-title`}>{component?.description}</h1>
        <div className={`${styleName}-tab`}>
          <ComponentNav componentId={componentId}></ComponentNav>
        </div>
        <div className={`${styleName}-bg`}>
          <Image
            className={`${styleName}-img-bg`}
            width={734}
            height={352}
            src="/docs/banner-bg.svg"
            alt="banner.svg"
          ></Image>
          <Image
            className={`${styleName}-img`}
            width={196}
            height={196}
            src="/docs/banner.svg"
            alt="banner.svg"
          ></Image>
        </div>
      </div>
    </div>
  );
}
