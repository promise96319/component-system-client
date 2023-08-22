'use client';

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
    error,
    mutate: updateDiscussions
  } = useDiscussions({
    majorVersionId,
    componentId: params.componentId
  });

  if (error) {
    return null;
  }

  return (
    <div className={styleName}>
      <CreateDiscussion componentId={params.componentId} onCreated={updateDiscussions}></CreateDiscussion>
      <DiscussionList discussions={discussions} onUpdateDiscussions={updateDiscussions}></DiscussionList>
    </div>
  );
}
