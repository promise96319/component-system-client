import { Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { VersionWithChangelogs, useVersionChangelogFilter } from '@/services';
import { VersionChangelog, VersionChangelogType } from '@/services/common';

const { Title, Text, Paragraph } = Typography;

export const VersionChangelogItem = (props: { versionChangelog: VersionWithChangelogs }) => {
  const { version, publishedAt, changelogs } = props.versionChangelog;
  const [majorVersionId] = useMajorVersionId();
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
    data[changelog.type].push(changelog);
  });

  const renderList = (title: string, changelogs: VersionChangelog[]) => {
    if (!changelogs.length) {
      return null;
    }

    return (
      <section>
        <Title heading={6}>{title}</Title>
        <Paragraph className="ml-px-16">
          <ul>
            {changelogs.map((changelog: VersionChangelog) => (
              <li key={changelog.id}>
                <Text>{changelog.content}</Text>
                {changelog.demandNo && (
                  <>
                    （<Text type="primary">#{changelog.demandNo}</Text>）
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

  return (
    <section>
      <Title heading={4}>{version}</Title>
      <Text type="secondary">{dayjs(publishedAt).format('YYYY-MM-DD hh:mm:ss')}</Text>
      {Object.entries(data).map(([key, value]) => renderList(typeMap[key], value))}
    </section>
  );
};

export const VersionChangelogList = (props: { versionChangelogs: VersionWithChangelogs[] }) => {
  return props.versionChangelogs.map((changelog) => (
    <VersionChangelogItem versionChangelog={changelog} key={changelog.version}></VersionChangelogItem>
  ));
};
