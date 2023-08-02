import { Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { VersionWithChangelogs } from '@/services';
import { VersionChangelog } from '@/services/common';

const { Title, Text, Paragraph } = Typography;

export const VersionChangelogItem = (props: { versionChangelog: VersionWithChangelogs }) => {
  const { version, publishedAt, changelogs } = props.versionChangelog;

  return (
    <section>
      <Title heading={4}>{version}</Title>
      <Text type="secondary">{dayjs(publishedAt).format('YYYY-MM-DD hh:mm:ss')}</Text>
      <Paragraph>
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

export const VersionChangelogList = (props: { versionChangelogs: VersionWithChangelogs[] }) => {
  //
  return props.versionChangelogs.map((changelog) => (
    <VersionChangelogItem versionChangelog={changelog} key={changelog.version}></VersionChangelogItem>
  ));
};
