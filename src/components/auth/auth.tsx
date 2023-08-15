'use client';

import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/services';
import { useTokenStorage } from '../../hooks/storage/use-token-storage';

export default function Auth(props: { children: React.ReactNode }) {
  const path = usePathname();
  const [token] = useTokenStorage();
  const { data: user, isLoading: isValidating } = useUser({ stopFetch: !token, disallowError: true });

  useEffect(() => {
    if (['/playground'].includes(path)) {
      return;
    }

    const whiteList = ['/auth/login'];
    if (!isValidating) {
      if (token && user) {
        if (whiteList.includes(path)) {
          redirect('/');
        }
      } else {
        if (!whiteList.includes(path)) {
          redirect('/auth/login');
        }
      }
    }
  });

  return props.children;
}
