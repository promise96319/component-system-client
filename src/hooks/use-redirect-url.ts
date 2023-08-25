import { usePathname, useSearchParams } from 'next/navigation';

export const useCurrentUrl = () => {
  const path = usePathname();
  const searchStr = useSearchParams().toString;
  const fullUrl = searchStr ? `${path}?${searchStr}` : path;
  return encodeURIComponent(fullUrl);
};

export const useRedirectUrl = () => {
  const redirect = useSearchParams().get('redirect') ?? '/';
  return decodeURIComponent(redirect);
};
