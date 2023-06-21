import { serverFetch } from './common/fetch.server';
import { APIDoc } from './common/type';

export const getApiDoc = (componentId: string): Promise<APIDoc> => serverFetch(`/api-doc/${componentId}`);
