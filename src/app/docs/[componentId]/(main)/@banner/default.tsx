import { cookies } from 'next/headers';
import { ComponentDetail } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { ComponentNav } from './nav';

export default async function ComponentBanner({ params }: any) {
  const styleName = 'docs';

  const componentId = params.componentId;
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
