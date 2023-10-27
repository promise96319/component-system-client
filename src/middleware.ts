import { NextResponse } from 'next/server';
import { COOKIE_KEY_MAJOR_VERSION, COOKIE_KEY_MAJOR_VERSION_ID } from './constant';
import { MajorVersion } from './services/common';
import { serverFetch } from './services/common/fetch.server';
import type { NextRequest } from 'next/server';

const auth = async (request: NextRequest) => {
  const { pathname, searchParams, href, origin } = request.nextUrl;
  const token = request.cookies.get('token');

  let isAuth = !!token?.value;

  if (token?.value) {
    const user = await await serverFetch('/auth/user', { token: token.value });
    isAuth = !!user;
  }

  const whiteList = ['/auth/login'];

  if (isAuth && whiteList.includes(pathname)) {
    return NextResponse.redirect(decodeURIComponent(searchParams.get('redirect') ?? origin));
  }

  if (!isAuth && !whiteList.includes(pathname)) {
    return NextResponse.redirect(`${origin}/auth/login?redirect=${encodeURIComponent(href)}`);
  }

  return false;
};

const setMarjorVersion = async (request: NextRequest) => {
  const { pathname, origin, searchParams } = request.nextUrl;

  // 版本切换
  const versionList = await serverFetch<MajorVersion[]>('/major-version');

  const setMajorVersionCookie = (response: NextResponse, majorVersion: Pick<MajorVersion, 'id' | 'majorVersion'>) => {
    response.cookies.set(COOKIE_KEY_MAJOR_VERSION, `${majorVersion.majorVersion}`);
    response.cookies.set(COOKIE_KEY_MAJOR_VERSION_ID, majorVersion.id);
    request.cookies.set(COOKIE_KEY_MAJOR_VERSION, `${majorVersion.majorVersion}`);
    request.cookies.set(COOKIE_KEY_MAJOR_VERSION_ID, majorVersion.id);
  };

  const handleVersionNotExist = (majorVersion: Pick<MajorVersion, 'id' | 'majorVersion'>) => {
    const latestVersion = majorVersion.majorVersion;
    searchParams.set('v', `${latestVersion}`);
    const res = NextResponse.redirect(`${origin}${pathname}?${searchParams.toString()}`);
    setMajorVersionCookie(res, majorVersion);
    return res;
  };

  const version = searchParams.get('v');

  if (version) {
    const majorVersion = versionList.find((item) => `${item.majorVersion}` === version);
    if (!majorVersion) {
      return handleVersionNotExist(versionList[0]);
    }
    const res = NextResponse.next();
    setMajorVersionCookie(res, majorVersion);
    return res;
  } else {
    const id = request.cookies.get(COOKIE_KEY_MAJOR_VERSION_ID);
    const majorVersion = versionList.find((item) => item.id === id?.value);
    return handleVersionNotExist(majorVersion ?? versionList[0]);
  }
};

export async function middleware(request: NextRequest) {
  const authResponse = await auth(request);
  if (authResponse) {
    return authResponse;
  }

  return await setMarjorVersion(request);
}

export const config = {
  // https://github.com/vercel/next.js/issues/48077
  matcher: ['/admin/:path*', '/docs/:path*', '/editor/:path*', '/auth/:path*', '/playground/:path*']
};
