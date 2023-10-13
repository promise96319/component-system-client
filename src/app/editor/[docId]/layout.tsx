// import { DesignDependency } from './_components/dependency';

import { cookies } from 'next/headers';
import { ComponentDetail } from '@/services/common';
import { serverFetch } from '@/services/common/fetch.server';

export async function generateMetadata({ params }: { params: { docId: string } }) {
  const { docId } = params;
  const majorVersionId = cookies().get('majorVersionId');
  const doc = await serverFetch<ComponentDetail>(`/spec/${docId}`);
  const component = await serverFetch<ComponentDetail>(`/component/${doc.componentId}`, {
    query: {
      majorVersionId: majorVersionId?.value
    }
  });

  return {
    title: {
      absolute: `${component.description} | 编辑`
    }
  };
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <DesignDependency></DesignDependency> */}
      {children}
    </>
  );
}
