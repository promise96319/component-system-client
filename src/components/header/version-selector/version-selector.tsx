'use client';

import { useMajorVersions } from '@/services/version';
import { Select } from '@arco-design/web-react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Option = Select.Option;

const MajorVersionSelector = () => {
  const styleName = 'version-selector';

  const { data: versionList = [] } = useMajorVersions();
  const [majorVersionId, setMajorVersionId] = useMajorVersionId();
  const router = useRouter();

  const switchMajorVersion = useCallback(
    (versionId: string) => {
      setMajorVersionId(versionId);
      router.refresh();
    },
    [router, setMajorVersionId]
  );

  return (
    <Select
      value={majorVersionId}
      className={styleName}
      onChange={switchMajorVersion}
      style={{ width: '120px', marginRight: '24px' }}
    >
      {versionList.map((version: any) => (
        <Option key={version.id} value={version.id}>
          {version.id === majorVersionId ? version.versions[0]?.version : version.majorVersion}
        </Option>
      ))}
    </Select>
  );
};

export default MajorVersionSelector;
