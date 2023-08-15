'use client';

import { Drawer, DrawerProps, Table } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { DocHistory as DocHistoyType, useDocHistory } from '@/services';
import { Demand, User } from '@/services/common';
import { DemandLink } from '../demand';

export const DocHistory = (
  props: DrawerProps & {
    id: string;
  }
) => {
  const styleName = 'doc-history';
  const { id, ...restProps } = props;
  const { data: historyList } = useDocHistory(id);

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
      dataIndex: 'demand.no',
      key: 'demand.no',
      render: (value?: Demand) => (value?.no ? <DemandLink no={value.no}></DemandLink> : '-')
    },
    {
      title: '更新版本',
      dataIndex: 'demand',
      key: 'demand.version',
      render: (value: Demand | undefined, item: DocHistoyType) => {
        const version = item.version ?? value?.version;
        return version ? `v${version}` : '-';
      }
    }
  ];

  return (
    <Drawer {...restProps} title="历史记录" className={styleName} width={800}>
      <Table rowKey="id" data={historyList} columns={columns}></Table>
    </Drawer>
  );
};
