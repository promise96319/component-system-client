import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { HOST } from './constant';

const API_URL = `${HOST}/docs`;

export const useGetAPIDocs = (componentName: string) => {
  const url = `${API_URL}/${componentName}`;

  // todo 再封装
  return useSWR(url, () =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.data)
  );
};

export const useSaveAPIDocs = (componentName: string) => {
  const url = `${API_URL}/${componentName}`;

  // todo 再封装
  return useSWRMutation(url, () => fetch(url, { method: 'post' }).then((res) => res.json()));
};
