import Link from 'next/link';

export const DemandLink = ({ no, path }: { no: number; path?: string }) => {
  return <Link href={`${path ?? '/admin/demand'}?no=${no}`}>#{no}</Link>;
};
