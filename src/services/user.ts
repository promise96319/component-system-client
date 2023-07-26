import { fetcher } from '.';

export const useUser = () => {
  return {
    // user,
    // setUser,
    // getUser
  };
};

export const getUser = () => fetcher('/user');
