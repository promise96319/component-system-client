'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetAPIDocs, useSaveAPIDocs } from '@/services/docs';
import { Button, Modal } from '@qt/design';

export default function APIDoc() {
  const params = useParams();

  const { data, error, isLoading } = useGetAPIDocs(params.slug);
  const { trigger } = useSaveAPIDocs(params.slug);

  const [open, setOpen] = useState(false);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <h1>{data.id} docs</h1>
      <div>编辑次数{data.count}</div>
      <Button type="primary" onClick={() => trigger()}>
        保存文档
      </Button>

      <Button onClick={() => setOpen(true)}>打开 Modal</Button>
      <Modal visible={open} onCancel={() => setOpen(false)}>
        hello world
      </Modal>
    </div>
  );
}
