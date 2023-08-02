'use client';

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

  return (
    <div className={styleName}>
      <CreateDemand componentId={params.componentId} onCreated={updateDemands}></CreateDemand>
      <DemandList demands={demands} onUpdateDemands={updateDemands}></DemandList>
    </div>
  );
}
