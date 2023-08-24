import { cookies, headers } from 'next/headers';
import { serverFetch } from '@/services/common/fetch.server';
import { getPath } from '@/utils/header';

// import { redirect, usePathname } from 'next/navigation';
// import { useEffect } from 'react';
// import { getToken } from '@/cookie/token';
// import { useUser } from '@/services';
// import { useTokenCookie } from '../../hooks/use-token-cookie';

export async function Auth(props: { children: React.ReactNode }) {
  const headerList = headers();
  const path = getPath(headerList) ?? '';

  const notAuthPath = ['/playground'];
  if (notAuthPath.includes(path)) {
    return <>{props.children}</>;
  }

  const token = cookies().get('token')?.value;

  let isAuth = !!token;
  const user = await serverFetch('/auth/user', { token });
  console.log('user=========', user);

  // const { data: user, isLoading: isValidating } = useUser({ stopFetch: !token, disallowError: true });
  // useEffect(() => {
  //   console.log('auth1', 111);
  //   if (['/playground'].includes(path)) {
  //     return;
  //   }

  //   const whiteList = ['/auth/login'];
  //   console.log('333333', 333333);
  //   if (!isValidating) {
  //     console.log('auth2', user);
  //     if (token && user) {
  //       if (whiteList.includes(path)) {
  //         redirect('/');
  //       }
  //     } else {
  //       console.log('auth3', 3);
  //       if (!whiteList.includes(path)) {
  //         redirect('/auth/login');
  //       }
  //     }
  //   }
  // }, [path]);

  return <>{props.children}</>;
}
