'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMajorVersionId } from '@/hooks/use-major-version-id';

export const MajorVersion = (props: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const vid = searchParams.get('vid');
  const [_, setMajorVersion] = useMajorVersionId();

  useEffect(() => {
    // 将当前版本存储到本地
    if (vid) {
      setMajorVersion(vid);
      const query = [...searchParams.entries()]
        .filter(([key]) => key !== 'vid')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const url = `${path}${query ? `?${query}` : ''}`;
      router.replace(url);
    }
  }, []);

  return props.children;
};
