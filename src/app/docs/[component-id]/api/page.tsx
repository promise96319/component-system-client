'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Modal } from '@qt/design';

export default function APIDoc() {
  const params = useParams();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打开 Modal</Button>
      <Modal visible={open} onCancel={() => setOpen(false)}>
        hello world
      </Modal>
    </div>
  );
}
