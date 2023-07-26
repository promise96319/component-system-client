import { fetcher } from '.';
import { Component } from './common/type';

export const getComponents = (majorVersionId: string) => fetcher(`/component?majorVersionId=${majorVersionId}`, {});
