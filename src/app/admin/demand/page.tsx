'use client';

import { Empty, Input } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { AdminContainer } from '@/components/admin/admin-container/admin-container';
import { DemandList } from '@/components/demand';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useDemands } from '@/services/demand';

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

  return (
    <AdminContainer title="需求列表">
      <Input
        prefix={<IconSearch></IconSearch>}
        onChange={(content) => {
          setContent(content);
        }}
      ></Input>

      {demands.length === 0 ? (
        <Empty style={{ marginTop: 160 }}></Empty>
      ) : (
        <DemandList demands={demands} onUpdateDemands={updateDemands}></DemandList>
      )}
    </AdminContainer>
  );
}
