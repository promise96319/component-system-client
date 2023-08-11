import { Modal, ModalProps, Message, Table, Tabs, Grid, Empty } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DemandSelect } from '@/components/demand';
import { VersionChangelogItem } from '@/components/version-changelog';
import { useDocContent, useLatestNpmVersions, useReleaseVersion } from '@/services';
import { Demand, DemandStatus, User } from '@/services/common';
import { useDemands } from '@/services/demand';
import { useVersionChangelog } from '@/services/version-changelog';
import { useMajorVersion } from '../../../../services/version';

const { Row, Col } = Grid;
const { TabPane } = Tabs;

export const ReleaseVersion = (
  props: ModalProps & {
    majorVersionId: string;
  }
) => {
  const { majorVersionId, ...restProps } = props;
  const [demandIds, setDemandIds] = useState<string[]>([]);
  const { data: major } = useMajorVersion(majorVersionId);
  const { data: latestVersion } = useLatestNpmVersions(major?.majorVersion);
  const { data: versionChangelog } = useVersionChangelog({ version: latestVersion });
  const { data: demands } = useDemands({
    majorVersionId,
    status: DemandStatus.OPENED
  });
  const { data: docs } = useDocContent({ demandIds });

  const { trigger: releaseVersion, isMutating: isReleasing, error: releasingError } = useReleaseVersion();

  const handleRelease = async () => {
    if (isReleasing || !latestVersion) {
      return;
    }

    await releaseVersion({
      version: latestVersion,
      demandIds
    });

    if (!releasingError) {
      Message.success('发布成功');
      setDemandIds([]);
      props.onConfirm?.();
    }
  };

  return (
    <Modal
      title="发布版本"
      visible={true}
      {...restProps}
      style={{ width: 800 }}
      okText="发布"
      onOk={handleRelease}
      okButtonProps={{
        loading: isReleasing
      }}
    >
      <Row gutter={12}>
        <Col span={4}>组件库版本</Col>
        {/* todo 拉取最新版本 */}
        <Col span={20}>{latestVersion ? `v${latestVersion}` : '-'}</Col>
      </Row>
      <Row align="center" gutter={12} className="mt-px-16">
        <Col span={4}>关联需求</Col>
        <Col span={20}>
          <DemandSelect demands={demands} onChange={setDemandIds}></DemandSelect>
        </Col>
      </Row>
      <Row gutter={12} className="mt-px-16">
        <Col span={4}>变更内容</Col>
        <Col span={20}>
          <Tabs type="card">
            <TabPane key="version-changelog" title="组件变更">
              {versionChangelog?.[0] && versionChangelog[0].changelogs.length > 0 ? (
                <VersionChangelogItem versionChangelog={versionChangelog[0]}></VersionChangelogItem>
              ) : (
                <Empty></Empty>
              )}
            </TabPane>
            <TabPane key="api-doc" title="API 文档">
              <Table
                data={docs}
                columns={[
                  {
                    title: '修改时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
                  },
                  {
                    title: '修改说明',
                    dataIndex: 'remark',
                    key: 'remark'
                  },
                  {
                    title: '修改人',
                    dataIndex: 'createdBy',
                    key: 'createdBy.nickname',
                    render: (value: User) => value.nickname ?? '-'
                  },
                  {
                    title: '关联需求',
                    dataIndex: 'demand.no',
                    key: 'demand.no',
                    render: (value?: Demand) => (value?.no ? `#${value.no}` : '-')
                  }
                ]}
              ></Table>
            </TabPane>
            <TabPane key="design-doc" title="设计规范">
              {/* todo：设计规范 */}
              {/* <Typography.Paragraph>Content of Tab Panel 4</Typography.Paragraph> */}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Modal>
  );
};
