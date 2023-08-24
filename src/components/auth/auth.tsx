'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/services';
import { useTokenCookie } from '../../hooks/use-token-cookie';

export default function Auth(props: { children: React.ReactNode }) {
  const path = usePathname();
  const [token] = useTokenCookie();
  const { data: user, isLoading: isValidating } = useUser({ stopFetch: !token, disallowError: true });

  console.log('auth');

  useEffect(() => {
    console.log('auth1', 111);
    if (['/playground'].includes(path)) {
      return;
    }

    const whiteList = ['/auth/login'];
    if (!isValidating) {
      console.log('auth2', user);
      if (token && user) {
        if (whiteList.includes(path)) {
          redirect('/');
        }
      } else {
        console.log('auth3', 3);
        if (!whiteList.includes(path)) {
          redirect('/auth/login');
        }
      }
    }
  });

  return props.children;
}
