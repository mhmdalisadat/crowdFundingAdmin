import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const usePostPic = (trace_code) => {
  const accessApi = getCookie('accessApi');

  const sendPlanPic = async (data) => {
    const response = await api.post(`/api/send/picture/${trace_code}/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'multipart/form-data',
      },
    });    
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (data) => sendPlanPic(data),
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('Error posting picture:', error);
    },
    onMutate: () => {
    },
  });
  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading,
    isError: mutation.isError,
  };
};
