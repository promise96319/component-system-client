'use client';

import { Button, Grid, Modal, Table } from '@arco-design/web-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { AdminContainer } from '@/components/admin/admin-container/admin-container';
import { Version } from '@/services/common';
import { useMajorVersions, useCreateMajorVersion } from '@/services/version';
import { ReleaseVersion } from './release-version/release-version';

export default function VersionManager() {
  const [currentId, setCurrenId] = useState('');

  const { data, isLoading, error, mutate } = useMajorVersions();
  const { trigger: createMajorVersion } = useCreateMajorVersion();

  if (error) {
    return null;
  }

  const handleCreateMajorVersion = () => {
    const latestMajorVersion = data[0].majorVersion ?? 0;
    Modal.confirm({
      title: '新建版本',
      content: `确定基于 v${latestMajorVersion}.x 版本组件库文档创建 v${latestMajorVersion + 1}.x 版本组件库文档吗？`,
      onConfirm: async () => {
        await createMajorVersion(undefined);
        await mutate();
      }
    });
  };

  const columns = [
    {
      title: '文档版本',
      dataIndex: 'majorVersion',
      key: 'majorVersion',
      render(col: number) {
        return `v${col}.x`;
      }
    },
    {
      title: '最近发布人',
      dataIndex: 'versions',
      key: 'version.releasedBy',
      render(versions: Version[]) {
        return versions[0]?.releasedBy?.nickname ?? '-';
      }
    },
    {
      title: '最近发布时间',
      dataIndex: 'versions',
      key: 'version.releasedAt',
      render(versions: Version[]) {
        const time = versions[0]?.releasedAt;
        return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '-';
      }
    },
    {
      title: '组件库版本',
      dataIndex: 'versions',
      key: 'version',
      render(versions: Version[]) {
        return versions[0]?.version ?? '-';
      }
    },
    {
      title: <div style={{ paddingLeft: 15 }}>操作</div>,
      dataIndex: 'id',
      key: 'operation',
      render(id: string, record: any) {
        return (
          <>
            <Link href={`/admin/version-changelog?v=${record.majorVersion}`}>
              <Button type="text">版本记录</Button>
            </Link>

            <Button type="text" onClick={() => setCurrenId(id)}>
              发布
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <AdminContainer title="版本管理">
      <Grid.Row justify="end" style={{ marginBottom: 24 }}>
        <Button type="primary" onClick={handleCreateMajorVersion}>
          新建版本
        </Button>
      </Grid.Row>
      <Table rowKey="id" columns={columns} data={data} loading={isLoading} pagination={false} />
      {currentId && (
        <ReleaseVersion
          visible={!!currentId}
          majorVersionId={currentId}
          onCancel={() => setCurrenId('')}
          onConfirm={() => {
            setCurrenId('');
            mutate();
          }}
        ></ReleaseVersion>
      )}
    </AdminContainer>
  );
}
