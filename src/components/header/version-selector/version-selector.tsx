'use client';

import { Select } from '@arco-design/web-react';
import { getCookie, setCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { QUERY_KEY_MAJOR_VERSION as VersionKey } from '@/constant';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { MajorVersion } from '@/services/common';
import { useMajorVersions } from '@/services/version';
// import { onChange } from './server-action';

const Option = Select.Option;

const MajorVersionSelector = () => {
  const styleName = 'version-selector';
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: versionList = [], isLoading } = useMajorVersions();
  const [majorVersionId] = useMajorVersionId();
  const router = useRouter();

  const switchMajorVersion = (version: Pick<MajorVersion, 'id' | 'majorVersion'>) => {
    setCookie('majorVersion', version.majorVersion);
    setCookie('majorVersionId', version.id);
    const newQuery = qs.stringify({ ...qs.parse(searchParams.toString()), [VersionKey]: version.majorVersion });
    router.replace(`${pathname}?${newQuery}`);
    // window.location.href = `${pathname}?${newQuery}`;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Select
      value={majorVersionId}
      className={styleName}
      onChange={(_, option: any) => switchMajorVersion(option.extra)}
      style={{ width: '120px', marginRight: '24px' }}
    >
      {versionList.map((version: any) => (
        <Option key={version.id} value={version.id} extra={version}>
          {version.id === majorVersionId ? version.versions[0]?.version : version.majorVersion}
        </Option>
      ))}
    </Select>
  );
};

export default MajorVersionSelector;
