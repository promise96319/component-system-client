import { serverFetch } from '.';
import { Component } from './common/type';

export const getComponents = (): Promise<Component[]> => serverFetch('component');
