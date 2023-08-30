'use client';

import { Empty } from '@arco-design/web-react';
import React from 'react';
import { CreateDemand, DemandList } from '@/components/demand';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useDemands } from '@/services/demand';

import './page.scss';

export default function Demand({ params }: { params: { componentId: string } }) {
  const styleName = 'demand';

  const [majorVersionId] = useMajorVersionId();

  const {
    data: demands,
    error,
    mutate: updateDemands
  } = useDemands({
    majorVersionId,
    componentId: params.componentId
  });

  if (error) {
    return null;
  }

  if (demands.length === 0) {
    return <Empty style={{ marginTop: 128 }} description="暂无需求"></Empty>;
  }

  return (
    <div className={styleName}>
      <div className={`${styleName}-header`}>
        <h2>需求（{demands.length}）</h2>
        <CreateDemand componentId={params.componentId} onCreated={updateDemands}></CreateDemand>
      </div>
      <DemandList demands={demands} onUpdateDemands={updateDemands}></DemandList>
    </div>
  );
}
