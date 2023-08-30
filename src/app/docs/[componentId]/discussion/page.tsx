'use client';

import { Empty } from '@arco-design/web-react';
import React from 'react';
import { CreateDiscussion, DiscussionList } from '@/components/discussion';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useDiscussions } from '@/services/discussion';

import './page.scss';

export default function Discussion({ params }: { params: { componentId: string } }) {
  const styleName = 'discussion';

  const [majorVersionId] = useMajorVersionId();

  const {
    data: discussions,
    isLoading,
    error,
    mutate: updateDiscussions
  } = useDiscussions({
    majorVersionId,
    componentId: params.componentId
  });

  if (error || isLoading) {
    return null;
  }

  const createDiscussion = (
    <CreateDiscussion componentId={params.componentId} onCreated={updateDiscussions}></CreateDiscussion>
  );

  if (discussions.length === 0) {
    return <Empty style={{ marginTop: 128 }} description={createDiscussion}></Empty>;
  }

  return (
    <div className={styleName}>
      <div className={`${styleName}-header`}>
        <h2>讨论（{discussions.length}）</h2>
        {createDiscussion}
      </div>
      <DiscussionList discussions={discussions} onUpdateDiscussions={updateDiscussions}></DiscussionList>
    </div>
  );
}
