import { Empty, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { DemandLink } from '@/components/demand';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { VersionWithChangelogs, useVersionChangelogFilter } from '@/services';
import { VersionChangelog, VersionChangelogType } from '@/services/common';

import './version-changelog-list.scss';

const { Text, Paragraph } = Typography;

export const ChangelogPrefixIcon = {
  [VersionChangelogType.FEATURE]: '🆕 ',
  [VersionChangelogType.BUGFIX]: '🐛 ',
  [VersionChangelogType.STYLE]: '💅 ',
  [VersionChangelogType.REFACTOR]: '💎 '
};

export const VersionChangelogItem = (props: { changelogs: VersionChangelog[]; majorVersionId: string }) => {
  const styleName = 'version-changelog-list-item';
  const { changelogs, majorVersionId } = props;
  const { data: filter } = useVersionChangelogFilter(majorVersionId);
  const typeMap =
    filter?.types?.reduce((obj: Record<string, any>, item) => {
      obj[item.id] = item.name;
      return obj;
    }, {}) ?? {};

  const data: Record<VersionChangelogType, VersionChangelog[]> = {
    [VersionChangelogType.FEATURE]: [],
    [VersionChangelogType.BUGFIX]: [],
    [VersionChangelogType.STYLE]: [],
    [VersionChangelogType.REFACTOR]: []
  };
  changelogs.forEach((changelog: VersionChangelog) => {
    if (data[changelog.type]) {
      data[changelog.type].push(changelog);
    }
  });

  const renderList = (title: string, key: VersionChangelogType, changelogs: VersionChangelog[], index: number) => {
    if (!changelogs.length) {
      return null;
    }

    return (
      <section key={index} className={styleName}>
        <Text className={`${styleName}-title`}>
          {ChangelogPrefixIcon[key]}
          {title}
        </Text>
        <Paragraph className="ml-px-24">
          <ul>
            {changelogs.map((changelog: VersionChangelog) => (
              <li key={changelog.id}>
                <Text>· {changelog.content}</Text>
                {changelog.demandNo && (
                  <>
                    （<DemandLink no={changelog.demandNo}></DemandLink>）
                  </>
                )}
              </li>
            ))}
          </ul>
        </Paragraph>
      </section>
    );
  };

  if (!changelogs.length) {
    return null;
  }

  return Object.entries(data).map(([key, value], index) =>
    renderList(typeMap[key], key as VersionChangelogType, value, index)
  );
};

export const VersionChangelogList = (props: { versionChangelogs: VersionWithChangelogs[] }) => {
  const styleName = 'version-changelog-list';
  const [majorVersionId] = useMajorVersionId();

  if (!props.versionChangelogs.length) {
    return <Empty style={{ marginTop: 160 }}></Empty>;
  }

  return props.versionChangelogs.map((changelog) => {
    const { version, releasedAt } = changelog;
    if (changelog.changelogs.length === 0) {
      return null;
    }

    return (
      <section key={version} className={styleName}>
        <Text className={`${styleName}-title`}>{version}</Text>
        <Text className={`${styleName}-time`} type="secondary">
          发布于：{dayjs(releasedAt).format('YYYY-MM-DD hh:mm:ss')}
        </Text>
        <VersionChangelogItem
          changelogs={changelog.changelogs}
          key={changelog.version}
          majorVersionId={majorVersionId}
        ></VersionChangelogItem>
      </section>
    );
  });
};
