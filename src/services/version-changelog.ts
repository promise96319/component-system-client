import { Version, VersionChangelog, VersionChangelogType, useFetch } from './common';

export interface ChangelogType {
  id: string;
  name: keyof VersionChangelogType;
}

export interface ChangelogFilter {
  types: ChangelogType[];
  versions: Version[];
}

export const useVersionChangelogFilter = (majorVersionId?: string) => {
  return useFetch<ChangelogFilter>('/version-changelog/filters', {
    stopFetch: !majorVersionId,
    query: { majorVersionId }
  });
};

export interface VersionChangelogQuery {
  majorVersionId?: string;
  componentId?: string;
  types?: string[];
  startVersion?: string;
  endVersion?: string;
  version?: string;
}

export interface VersionWithChangelogs extends Version {
  changelogs: VersionChangelog[];
}

export const useVersionChangelog = (query: VersionChangelogQuery) => {
  return useFetch<VersionWithChangelogs[]>(
    '/version-changelog',
    { query, stopFetch: !query.majorVersionId },
    { keepPreviousData: true }
  );
};

export const useVersionChangelogByVersion = (versionId: string) => {
  return useFetch<VersionChangelog[]>(`/version-changelog/${versionId}`);
};
