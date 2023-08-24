'use client';

import { Select, Space } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useVersionChangelogFilter, VersionChangelogQuery } from '@/services';
import { normalizeTreeData } from '@/utils';

export const VersionChangelogFilter = (props: {
  onChange?: (query: Pick<VersionChangelogQuery, 'types' | 'startVersion' | 'endVersion'>) => void;
}) => {
  const styleName = 'version-changelog-filter';
  const [types, setTypes] = useState<string[]>([]);
  const [startVersion, setStartVersion] = useState<string | undefined>();
  const [endVersion, setEndVersion] = useState<string | undefined>();
  const [majorVersionId] = useMajorVersionId();
  const { data: filter } = useVersionChangelogFilter(majorVersionId);

  useEffect(() => {
    props.onChange?.({
      types,
      startVersion,
      endVersion
    });
  }, [types, startVersion, endVersion]);

  if (!filter) {
    return null;
  }

  return (
    <Space className={styleName}>
      <Select
        prefix="起始版本"
        placeholder="请选择版本"
        style={{ width: 200 }}
        options={normalizeTreeData(filter.versions, { label: 'version', value: 'version' })}
        onChange={(value) => setStartVersion(value)}
        allowClear
      ></Select>
      <Select
        prefix="结束版本"
        placeholder="请选择版本"
        style={{ width: 200 }}
        options={normalizeTreeData(filter.versions, { label: 'version', value: 'version' })}
        onChange={(value) => setEndVersion(value)}
        allowClear
      ></Select>
      <Select
        prefix="类别"
        placeholder="请选择类别"
        style={{ width: 400 }}
        options={normalizeTreeData(filter.types, { label: 'name', value: 'id' })}
        mode="multiple"
        maxTagCount={2}
        onChange={(value) => setTypes(value)}
        allowClear
      ></Select>
    </Space>
  );
};
