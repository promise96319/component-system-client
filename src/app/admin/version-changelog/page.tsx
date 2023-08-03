'use client';

import { useState } from 'react';
import { AdminContainer } from '@/components/admin';
import { VersionChangelogFilter, VersionChangelogList } from '@/components/version-changelog';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { VersionChangelogQuery, useVersionChangelog } from '@/services';

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
      <VersionChangelogList versionChangelogs={versionChangelogs}></VersionChangelogList>
    </AdminContainer>
  );
}
