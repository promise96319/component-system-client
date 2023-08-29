import {
  Modal,
  Space,
  ModalProps,
  Button,
  Message,
  Table,
  Tabs,
  Grid,
  Empty,
  Typography
} from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DemandLink, DemandSelect } from '@/components/demand';
import { VersionChangelogItem } from '@/components/version-changelog';
import { DocType, useDocContents, useLatestNpmVersions, useReleaseVersion } from '@/services';
import { Demand, DemandStatus, User } from '@/services/common';
import { useDemandCanBeClosed, useDemands } from '@/services/demand';
import { useMajorVersion } from '@/services/version';
import { useVersionChangelog, useVersionChangelogByVersion } from '@/services/version-changelog';
import { AdminContainer } from '../../_components';

import './release-version.scss';

const { Row, Col } = Grid;
const { TabPane } = Tabs;

export const ReleaseVersion = (
  props: ModalProps & {
    majorVersionId: string;
  }
) => {
  const styleName = 'release-version';
  const { majorVersionId, ...restProps } = props;
  const [demandIds, setDemandIds] = useState<string[]>([]);
  const { data: major } = useMajorVersion(majorVersionId);
  // todo
  // const { data: latestVersion } = useLatestNpmVersions(major?.majorVersion);
  const latestVersion = '3.10.31';
  const { data: versionChangelogs } = useVersionChangelogByVersion(latestVersion);
  const { data: demands } = useDemands({
    majorVersionId,
    status: DemandStatus.OPENED
  });
  const { data: docs } = useDocContents({ demandIds });
  const { trigger: releaseVersion, isMutating: isReleasing } = useReleaseVersion();
  const { trigger: isDemandCanBeClosed, data: conflictDocs } = useDemandCanBeClosed();
  const [isConflictModalVisible, setIsConflictModalVisible] = useState(false);

  const handleRelease = async () => {
    if (!latestVersion) {
      Message.error('请先发布组件库版本');
      return;
    }

    if (isReleasing) {
      return;
    }

    // 校验需求是否有冲突
    if (demandIds.length > 0) {
      const res = await isDemandCanBeClosed(demandIds);
      if (res?.api.length > 0 || res?.design.length > 0) {
        setIsConflictModalVisible(true);
        return;
      }
    }

    await releaseVersion({
      version: latestVersion,
      demandIds
    });

    Message.success('发布成功');
    setDemandIds([]);
    props.onConfirm?.();
  };

  const columns = [
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
      dataIndex: 'demand',
      key: 'demand.no',
      render: (value?: Demand) => (value?.no ? <DemandLink no={value.no}></DemandLink> : '-')
    }
  ];

  const renderConflictDocs = (docs: any[] = []) => {
    if (docs.length === 0) {
      return <Empty description="暂无冲突"></Empty>;
    }

    return (
      <Typography.Paragraph>
        {docs.map((item: any, index: number) => {
          return (
            <ul key={index}>
              <li>
                {item.doc.spec.componentId} 文档（<DemandLink no={item.doc.demand.no}></DemandLink>
                对应的文档需要先解决以下需求才可更新）
                <ul>
                  {item.history.map((doc: any, index: number) => (
                    <li key={index}>
                      {doc.remark}（<DemandLink no={doc.demand.no}></DemandLink>）
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          );
        })}
      </Typography.Paragraph>
    );
  };

  return (
    <AdminContainer
      title={
        <div className={`${styleName}-header`}>
          <div className={`${styleName}-header-version`}>{latestVersion ? `v${latestVersion}` : '-'}</div>
          <Space>
            <Button onClick={props.onCancel}>取消</Button>
            <Button type="primary" onClick={handleRelease}>
              发布
            </Button>
          </Space>
        </div>
      }
    >
      <section className={`${styleName}-section`}>
        <h2>组件变更</h2>

        <div>
          {versionChangelogs && versionChangelogs.length > 0 ? (
            <VersionChangelogItem changelogs={versionChangelogs} majorVersionId={majorVersionId}></VersionChangelogItem>
          ) : (
            <Empty description="暂无变更"></Empty>
          )}
        </div>
      </section>

      <section className={`${styleName}-section`}>
        <h2>文档变更</h2>

        <section className={`${styleName}-demand`}>
          <Typography.Text className={`${styleName}-demand-label`} type="secondary">
            关联需求
          </Typography.Text>
          <DemandSelect demands={demands} value={demandIds} onChange={setDemandIds}></DemandSelect>
        </section>

        <section>
          <h3>API 文档</h3>

          <Table
            rowKey="id"
            border={false}
            data={docs?.filter((doc) => doc.spec.specType === DocType.API)}
            columns={columns}
            pagination={{ pageSize: 5 }}
          ></Table>
        </section>

        <section>
          <h3>设计规范</h3>

          <Table
            rowKey="id"
            border={false}
            data={docs?.filter((doc) => doc.spec.specType === DocType.DESIGN)}
            columns={columns}
            pagination={{ pageSize: 5 }}
          ></Table>
        </section>
      </section>

      <Modal
        title="以下需求有冲突"
        visible={isConflictModalVisible}
        okText="勾选所有有冲突的需求"
        onCancel={() => setIsConflictModalVisible(false)}
        onOk={() => {
          let conflictDemands: string[] = [];
          conflictDocs?.api.map((item: any) => {
            conflictDemands.push(...item.history.map((doc: any) => doc.demand.id));
          });
          conflictDocs?.design.map((item: any) => {
            conflictDemands.push(...item.history.map((doc: any) => doc.demand.id));
          });

          setDemandIds([...demandIds, ...conflictDemands]);
          setIsConflictModalVisible(false);
        }}
      >
        <Tabs>
          <TabPane key="api-doc" title="API 文档">
            {renderConflictDocs(conflictDocs?.api)}
          </TabPane>
          <TabPane key="design-doc" title="设计规范">
            {renderConflictDocs(conflictDocs?.design)}
          </TabPane>
        </Tabs>
      </Modal>
    </AdminContainer>
  );
};
