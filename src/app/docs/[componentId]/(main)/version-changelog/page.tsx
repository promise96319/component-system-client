'use client';

import { useState } from 'react';
import { VersionChangelogFilter, VersionChangelogList } from '@/components/version-changelog';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { VersionChangelogQuery, useVersionChangelog } from '@/services';

import './page.scss';

export default function VersionChangelog({ params }: { params: { componentId: string } }) {
  const styleName = 'version-changelog';
  const [majorVersionId] = useMajorVersionId();
  const [query, setQuery] = useState<VersionChangelogQuery>({});

  const { data: versionChangelogs = [] } = useVersionChangelog({
    majorVersionId,
    componentId: params.componentId,
    ...query
  });

  return (
    <div className={styleName}>
      <VersionChangelogFilter onChange={setQuery}></VersionChangelogFilter>
      <VersionChangelogList versionChangelogs={versionChangelogs}></VersionChangelogList>
    </div>
  );
}
