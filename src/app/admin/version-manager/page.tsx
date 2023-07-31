'use client';

import { useMajorVersions, useCreateMajorVersion } from '@/services/version';
import { AdminContainer } from '../_components/admin-container/admin-container';
import { Button, Grid, Modal, Table, Link as TextLink } from '@arco-design/web-react';
import { MajorVersion } from '@/services/common';
import Link from 'next/link';

export default function VersionManager() {
  const { data, isLoading, error, mutate } = useMajorVersions();
  const { trigger: createMajorVersion, error: updateError } = useCreateMajorVersion();

  if (error) {
    return null;
  }

  const handleCreateMajorVersion = () => {
    const latestMajorVersion = data[0].majorVersion ?? 0;
    // todo: 新建版本
    Modal.confirm({
      title: '新建版本',
      content: `确定基于 v${latestMajorVersion}.x 版本组件库文档创建 v${latestMajorVersion + 1}.x 版本组件库文档吗？`,
      onConfirm: async () => {
        await createMajorVersion();
        if (!updateError) {
          await mutate();
        }
      }
    });
  };

  const handlePublishVersion = (id: string) => {
    // todo 发布版本
    console.log('id', id);
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
    // todo: 需要加一个发布人的名称
    {
      title: '最近发布人',
      dataIndex: 'publishedBy',
      key: 'publishedBy',
      render(_col: any, item: MajorVersion) {
        return item.versions[0]?.publishedBy;
      }
    },
    {
      title: '最近发布时间',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      render(_col: any, item: MajorVersion) {
        return item.versions[0]?.publishedAt;
      }
    },
    {
      title: '组件库版本',
      dataIndex: 'versions',
      key: 'versions',
      render(_col: any, item: MajorVersion) {
        return item.versions[0]?.version;
      }
    },
    {
      title: <div style={{ paddingLeft: 15 }}>操作</div>,
      dataIndex: 'id',
      key: 'operation',
      render(id: string) {
        return (
          <>
            <Link href="/admin/changelog">
              <Button type="text">版本记录</Button>
            </Link>
            <Button type="text" onClick={() => handlePublishVersion(id)}>
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
      <Table columns={columns} data={data} loading={isLoading} pagination={false} />
    </AdminContainer>
  );
}
