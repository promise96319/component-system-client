import { Link as ArcoLink } from '@arco-design/web-react';
import Link from 'next/link';

export const DemandLink = ({ no, path }: { no: number; path?: string }) => {
  return (
    <Link href={`${path ?? '/admin/demand'}?no=${no}`}>
      <ArcoLink hoverable={false}>#{no}</ArcoLink>
    </Link>
  );
};
