'use client';

import { useParams } from 'next/navigation';

export default function APIDoc() {
  const params = useParams();

  console.log('params', params);

  return <div>设计文档</div>;
}
