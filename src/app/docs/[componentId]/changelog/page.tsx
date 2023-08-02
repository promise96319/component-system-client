'use client';

import { useChangelogFilter } from '@/services';
import { Select, Space } from '@arco-design/web-react';

export default function Changelog() {
  const styleName = 'changelog';
  const { data: filter } = useChangelogFilter();

  return (
    <div className={styleName}>
      {filter && (
        <Space>
          <Select></Select>
          <Select></Select>
          <Select></Select>
        </Space>
      )}
    </div>
  );
}
