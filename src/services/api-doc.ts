import { APIDoc } from './common';
import { serverFetch } from './common/fetch.server';

export const getApiDoc = (componentId: string): Promise<APIDoc> => serverFetch(`/api-doc/${componentId}`);
