import useSWR from 'swr';
import { sortVersion } from '@/utils/version';
const NPM_HOST = 'http://ued.qingteng.cn:81';

export const useLatestNpmVersions = (majorVersion?: number) => {
  const key = `${NPM_HOST}/@qt/design`;
  const { data, ...rest } = useSWR(majorVersion ? key : null, () => fetch(key).then((res) => res.json()));

  let latestVersion = '';
  if (data) {
    Object.keys(data.versions)
      .filter((v) => {
        const major = v.split('.')[0];
        return major === `${majorVersion}`;
      })
      .forEach((v) => {
        if (sortVersion(v, latestVersion ?? '0.0.0') > 0) {
          latestVersion = v;
        }
      });
  }

  return {
    data: latestVersion,
    ...rest
  };
};
