'use client';

import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { AdminContainer } from '../_components/admin-container/admin-container';
import { useDemands } from '@/services/demand';
import { useEffect, useState } from 'react';
import { Input } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { Comment } from '@/components';

export default function Demand() {
  const [majorVersionId] = useMajorVersionId();
  const [content, setContent] = useState('');
  const {
    data: demands,
    error,
    mutate: updateDemands
  } = useDemands({
    majorVersionId,
    content
  });

  useEffect(() => {
    updateDemands();
  }, [majorVersionId, content, updateDemands]);

  if (error) {
    return null;
  }

  console.log('demands', demands);

  return (
    <AdminContainer title="需求列表">
      <Input prefix={<IconSearch></IconSearch>} onChange={(content) => setContent(content)}></Input>

      {demands?.map((demand) => {
        return (
          <Comment
            key={demand.id}
            username={demand.createdBy.nickname ?? ''}
            content={demand.content ?? ''}
            updatedAt={demand.updatedAt ?? new Date()}
          >
            {/* hello */}
          </Comment>
        );
      })}
    </AdminContainer>
  );
}
