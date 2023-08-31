import { NextResponse } from 'next/server';
import qs from 'query-string';
import {
  QUERY_KEY_MAJOR_VERSION as VersionKey,
  COOKIE_KEY_MAJOR_VERSION,
  COOKIE_KEY_MAJOR_VERSION_ID
} from './constant';
import { MajorVersion } from './services/common';
import { serverFetch } from './services/common/fetch.server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { search, pathname, origin } = request.nextUrl;

  // 版本切换
  const query = qs.parse(search);
  const versionList = await serverFetch<MajorVersion[]>('/major-version');

  const setMajorVersionCookie = (response: NextResponse, majorVersion: Pick<MajorVersion, 'id' | 'majorVersion'>) => {
    response.cookies.set(COOKIE_KEY_MAJOR_VERSION, `${majorVersion.majorVersion}`);
    response.cookies.set(COOKIE_KEY_MAJOR_VERSION_ID, majorVersion.id);
  };

  const handleVersionNotExist = (majorVersion: Pick<MajorVersion, 'id' | 'majorVersion'>) => {
    const latestVersion = majorVersion.majorVersion;
    const newQuery = qs.stringify({ ...query, [VersionKey]: latestVersion });
    const res = NextResponse.redirect(`${origin}${pathname}?${newQuery}`);
    setMajorVersionCookie(res, majorVersion);
    return res;
  };

  const version = query[VersionKey];

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
}

export const config = {
  // matcher: ['/admin/:path*', '/docs/:path*', '/editor/:path*']
  matcher: ['/:path*']
};
