'use client';

import { redirect, usePathname } from 'next/navigation';
import { useTokenStorage } from '../../hooks/storage/use-token-storage';
import { useUser } from '@/services';
import { useEffect } from 'react';
export default function Auth(props: { children: React.ReactNode }) {
  const path = usePathname();
  const [token] = useTokenStorage();
  const { data: user, isLoading: isValidating } = useUser({ stopFetch: !token, disallowError: true });

  useEffect(() => {
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
