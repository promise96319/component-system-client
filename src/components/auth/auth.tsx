import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/services/common/fetch.server';
import { getNextUrl, getPath, getQuery } from '@/utils/header';

export async function Auth(props: { children: React.ReactNode }) {
  const headerList = headers();
  const path = getPath(headerList) ?? '';
  const query = getQuery(headerList);
  const nextUrl = getNextUrl(headerList);
  const children = <>{props.children}</>;

  const notAuthPath = ['/playground'];
  if (notAuthPath.includes(path)) {
    return children;
  }

  const token = cookies().get('token')?.value;

  let isAuth = !!token;
  if (token) {
    const user = await serverFetch('/auth/user', { token });
    isAuth = !!user;
  }

  const whiteList = ['/auth/login'];

  if (isAuth && whiteList.includes(path)) {
    redirect(decodeURIComponent(query.redirect ?? '/'));
  }

  if (!isAuth && !whiteList.includes(path)) {
    redirect(`/auth/login?redirect=${encodeURIComponent(nextUrl)}`);
  }

  return children;
}
