import { fetcher } from '.';

export const postLogin = (data: any) => {
  return fetcher('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
