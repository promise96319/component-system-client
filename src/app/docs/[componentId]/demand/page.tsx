'use client';

import React from 'react';
import { CreateDemand, DemandList } from '@/components/demand';
import { Empty } from '@/components/empty/empty';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useDemands } from '@/services/demand';

import './page.scss';

export default function Demand({ params }: { params: { componentId: string } }) {
  const styleName = 'demand';

  const [majorVersionId] = useMajorVersionId();

  const {
    data: demands,
    isLoading,
    error,
    mutate: updateDemands
  } = useDemands({
    majorVersionId,
    componentId: params.componentId
  });

  if (error || isLoading) {
    return null;
  }

  const createDemand = <CreateDemand componentId={params.componentId} onCreated={updateDemands}></CreateDemand>;

  if (demands.length === 0) {
    return <Empty style={{ marginTop: 128 }} description={createDemand}></Empty>;
  }

  return (
    <div className={styleName}>
      <div className={`${styleName}-header`}>
        <h2>需求（{demands.length}）</h2>
        {createDemand}
      </div>
      <DemandList demands={demands} onUpdateDemands={updateDemands}></DemandList>
    </div>
  );
}
