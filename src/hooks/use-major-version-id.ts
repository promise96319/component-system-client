'use client';

import { useEffect } from 'react';
import { useMajorVersions } from '@/services/version';
import { useMajorVersionIdStorage } from './storage';

export const useMajorVersionId = () => {
  // todo: 第一次未取到值，为 undefined
  const { data: versionList = [] } = useMajorVersions();
  const [majorVersionId, setMajorVersionId] = useMajorVersionIdStorage();

  useEffect(() => {
    if (!majorVersionId) {
      setMajorVersionId(versionList[0]?.id);
    } else if (versionList && versionList.length > 0) {
      const version = versionList.find((item) => item.id === majorVersionId);
      if (!version) {
        setMajorVersionId(versionList[0]?.id);
      }
    }
  }, [majorVersionId, setMajorVersionId, versionList]);

  return [majorVersionId, setMajorVersionId] as const;
};
