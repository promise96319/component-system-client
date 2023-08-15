import Link from 'next/link';

export const DemandLink = ({ no }: { no: number }) => {
  return <Link href={`/admin/demand?no=${no}`}>#{no}</Link>;
};
