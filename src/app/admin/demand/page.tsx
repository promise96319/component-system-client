'use client';

import { Empty, Input, Select, Space } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminContainer } from '@/components/admin/admin-container/admin-container';
import { DemandList } from '@/components/demand';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { DemandStatus } from '@/services/common';
import { useDemands } from '@/services/demand';

export default function Demand() {
  const [majorVersionId] = useMajorVersionId();
  const [content, setContent] = useState('');
  const [status, setStatus] = useState();
  const {
    data: demands,
    error,
    mutate: updateDemands
  } = useDemands({
    majorVersionId,
    content,
    status
  });

  const searchParams = useSearchParams();
  const no = searchParams.get('no');
  useEffect(() => {
    if (no) {
      const target = document.getElementById(no);
      if (target) {
        document.documentElement.scrollTop = target.offsetTop - 88;
      }
    }
  }, [no, demands]);

  useEffect(() => {
    updateDemands();
  }, [majorVersionId, content, status, updateDemands]);

  if (error) {
    return null;
  }

  return (
    <AdminContainer title="需求列表">
      <Space>
        <Select
          defaultValue="ALL"
          prefix="需求状态"
          options={[
            { label: '全部', value: 'ALL' },
            { label: '已解决', value: DemandStatus.CLOSED },
            { label: '待解决', value: DemandStatus.OPENED }
          ]}
          onChange={(value) => {
            if (value === 'ALL') {
              setStatus(undefined);
            } else {
              setStatus(value);
            }
          }}
        ></Select>
        <Input
          prefix={<IconSearch></IconSearch>}
          placeholder="搜索需求内容"
          onChange={(content) => {
            setContent(content);
          }}
        ></Input>
      </Space>

      {demands.length === 0 ? (
        <Empty style={{ marginTop: 160 }}></Empty>
      ) : (
        <DemandList demands={demands} onUpdateDemands={updateDemands}></DemandList>
      )}
    </AdminContainer>
  );
}
