import { serverFetch } from '.';
import { Component } from './type';

export const getComponents = (): Promise<Component[]> => serverFetch('component');
