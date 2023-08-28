'use client';

import { Space } from '@arco-design/web-react';
import { useState } from 'react';
import { VersionChangelogFilter, VersionChangelogList } from '@/components/version-changelog';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { VersionChangelogQuery, useVersionChangelog } from '@/services';
import { AdminContainer } from '../_components';

export default function VersionChangelog() {
  const [majorVersionId] = useMajorVersionId();
  const [query, setQuery] = useState<VersionChangelogQuery>({});

  const { data: versionChangelogs = [] } = useVersionChangelog({
    majorVersionId,
    ...query
  });

  return (
    <AdminContainer title="版本记录">
      <VersionChangelogFilter onChange={setQuery}></VersionChangelogFilter>
      <div style={{ height: 16 }}></div>
      <VersionChangelogList versionChangelogs={versionChangelogs}></VersionChangelogList>
    </AdminContainer>
  );
}
