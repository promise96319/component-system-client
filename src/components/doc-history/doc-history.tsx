'use client';

import { Drawer, DrawerProps, Table, Tag, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { DocHistory as DocHistoyType, useDocHistory } from '@/services';
import { Demand, User } from '@/services/common';
import { DemandLink } from '../demand';

export const DocHistory = (
  props: DrawerProps & {
    id: string;
    componentId: string;
  }
) => {
  const styleName = 'doc-history';
  const { id, componentId, ...restProps } = props;
  const { data: historyList } = useDocHistory(id);

  const columns = [
    {
      title: '',
      dataIndex: 'current',
      key: 'current',

      render: (value: string, record: any) =>
        value ? (
          <Tag color="green">当前文档</Tag>
        ) : record.pending ? (
          <Tag color="red">未更新</Tag>
        ) : (
          <Tag color="gray">已更新</Tag>
        )
    },
    {
      title: '修改时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '修改说明',
      dataIndex: 'remark',
      key: 'remark',
      render: (value: string) => (
        <Typography.Text ellipsis={{ wrapper: 'span', rows: 1 }} style={{ marginBottom: 0 }}>
          {value}
        </Typography.Text>
      )
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
      render: (value?: Demand) =>
        value?.no ? <DemandLink path={`/docs/${componentId}/demand`} no={value.no}></DemandLink> : '-'
    },
    {
      title: '更新版本',
      dataIndex: 'demand',
      key: 'demand.version',
      render: (value: Demand | undefined, item: DocHistoyType) => {
        const version = item.version ?? value?.version?.version;
        return version ? `v${version}` : '-';
      }
    }
  ];

  return (
    <Drawer {...restProps} title="更新记录" className={styleName} width={800}>
      <Table
        rowKey="id"
        data={historyList}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: true }}
      ></Table>
    </Drawer>
  );
};
