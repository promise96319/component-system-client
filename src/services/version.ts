import { fetcher } from '.';
import { MajorVersion } from './common/type';

export const getMajorVersions = () => fetcher('/major-version', {});
