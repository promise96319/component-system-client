import { cookies } from 'next/headers';
import { ComponentDetail } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';
import { ComponentBanner } from './_components/banner/component-banner';

import './layout.scss';

export async function generateMetadata({ params }: { params: { componentId: string } }) {
  const { componentId } = params;
  const majorVersionId = cookies().get('majorVersionId');
  const component = await serverFetch<ComponentDetail>(`/component/${componentId}`, {
    query: {
      majorVersionId: majorVersionId?.value
    }
  });

  return {
    title: component.description
  };
}

export default function DocsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { componentId: string };
}) {
  const styleName = 'docs';

  return (
    <div className={styleName}>
      <div className={`${styleName}-banner`}>
        <ComponentBanner componentId={params.componentId}></ComponentBanner>
      </div>
      <div className={`${styleName}-content`}>{children}</div>
    </div>
  );
}
