'use client';

import { Select } from '@arco-design/web-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { QUERY_KEY_MAJOR_VERSION as VersionKey } from '@/constant';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useMajorVersions } from '@/services/version';

const Option = Select.Option;

const MajorVersionSelector = () => {
  const styleName = 'version-selector';
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: versionList = [], isLoading } = useMajorVersions();
  const [majorVersionId, map] = useMajorVersionId();
  const router = useRouter();

  const switchMajorVersion = (versionId: string) => {
    const newQuery = qs.stringify({ ...searchParams, [VersionKey]: map.get(versionId) });
    router.replace(`${pathname}?${newQuery}`);
  };

  if (isLoading) {
    return null;
  }

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
