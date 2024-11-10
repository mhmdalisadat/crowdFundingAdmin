import { useMutation } from '@tanstack/react-query';
import { postInvistor } from './api';
import useGetParticipant from './useGetParticipant';

const usePostParticipant = (trace_code) => {
  const { refetch } = useGetParticipant(trace_code);
  
  const { mutate, isLoading: isPending, isError, isSuccess } = useMutation({
    mutationKey: ['postInvistor', trace_code],
    mutationFn: (data) => postInvistor(trace_code, data),
    onSettled: () => {
      refetch();
    },
  });
  
  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostParticipant;
