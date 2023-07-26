'use client';
import { getMajorVersions } from '@/services/version';
import { useEffect, useState } from 'react';
import { MajorVersion } from '@/services/common/type';
import { Select } from '@arco-design/web-react';

const Option = Select.Option;

const styleName = 'version-selector';

interface MajorVersionSelectorProps {
  onSelect: (majorVersionId: string) => void;
}

const MajorVersionSelector = ({ onSelect }: MajorVersionSelectorProps) => {
  const [versionList, setVersionList] = useState<MajorVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState('');

  const getMajorVersionList = async () => {
    const res = await getMajorVersions();
    if (res.code === 200) {
      setVersionList(res.data);
      handleSelectVersion(res.data[0].id);
    }
  };

  const handleSelectVersion = (value: string) => {
    setCurrentVersion(value);
    onSelect(value);
  };

  useEffect(() => {
    getMajorVersionList();
  }, []);

  return (
    <Select
      value={currentVersion}
      className={`${styleName}`}
      onChange={handleSelectVersion}
      style={{ width: '120px', marginRight: '24px' }}
    >
      {versionList.map((version) => (
        <Option key={version.id} value={version.id}>
          {
            String(version.id) === currentVersion ?
                version.versions[0]?.version
                :
                version.majorVersion
          }

        </Option>
      ))}
    </Select>
  );
};

export default MajorVersionSelector;
