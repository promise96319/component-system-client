'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function APIDoc() {
  const params = useParams();

  const [open, setOpen] = useState(false);

  return <div>hello world</div>;
}
