'use client';

import { useUser } from '@/services';
import './page.scss';

const Page = (props: any) => {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return <main>{JSON.stringify(user)}</main>;
};

export default Page;
