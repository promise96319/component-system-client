import { cookies, headers } from 'next/headers';
import { ComponentDetail } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { getPath } from '@/utils/header';
import { ComponentNav } from './component-nav';

export async function ComponentBanner() {
  const styleName = 'docs';

  const headerList = headers();
  const paths = getPath(headerList) ?? '';
  const componentId = paths.split('/').slice(-2)[0];

  const majorVersionId = cookies().get('majorVersionId');
  const component = await serverFetch<ComponentDetail>(`/component/${componentId}`, {
    query: {
      majorVersionId: majorVersionId?.value
    }
  });

  return (
    <div className={`${styleName}-banner-content`}>
      <h1>{component?.description}</h1>
      <div className={`${styleName}-banner-tab`}>
        <ComponentNav componentId={componentId}></ComponentNav>
      </div>
    </div>
  );
}
