import { useMutation } from './common';

export const useUploadImage = () => {
  return useMutation<{ file: File }, { url: string }>('/file/image', {
    isFormData: true
  });
};
