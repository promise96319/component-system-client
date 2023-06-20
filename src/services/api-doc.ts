import { serverFetch } from './fetch.server';
import { APIDoc } from './type';

export const getApiDoc = (componentId: string): Promise<APIDoc> => serverFetch(`/api-doc/${componentId}`);
