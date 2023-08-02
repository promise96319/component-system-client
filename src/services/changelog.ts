import { Version, VersionChangelogType, useFetch } from './common';

export interface ChangelogType {
  id: string;
  name: keyof VersionChangelogType;
}

export interface ChangelogFilter {
  types: ChangelogType[];
  versions: Version[];
}

export const useChangelogFilter = (majorVersionId?: string) => {
  return useFetch<ChangelogFilter>('/changelog/filters', { stopFetch: !majorVersionId, query: { majorVersionId } });
};

export interface ChangelogQuery {
  majorVersionId?: string;
  componentId?: string;
  demandId?: string;
  type?: string;
  startVersionId?: string;
  endVersionId?: string;
}

export const useChangelog = (query: ChangelogQuery) => {
  return useFetch('/changelog', { query, stopFetch: !query.majorVersionId });
};
