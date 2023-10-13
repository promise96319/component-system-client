'use client';

import { useSearchParams } from 'next/navigation';
import { QUERY_KEY_MAJOR_VERSION as VersionKey } from '@/constant';
import { useMajorVersions } from '@/services/version';

export const useMajorVersionId = () => {
  const sp = useSearchParams();

  const { data = [] } = useMajorVersions();

  const map = data.reduce((map, item) => {
    map.set(item.id, item.majorVersion);
    map.set(`${item.majorVersion}`, item.id);
    return map;
  }, new Map());

  return [map.get(sp?.get(VersionKey)), map] as const;
};
