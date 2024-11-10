import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useGetGuarante from './useGetGuarante';
import { PostGuarante } from './guaranteService';

const usePostGuarante = () => {
  const { trace_code } = useParams();

  const { refetch } = useGetGuarante();
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostGuarante',trace_code],
    mutationFn: (postData) => PostGuarante(trace_code,postData),
    onSettled: () => {
      refetch();
    },
  });
  return {
    date,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostGuarante;





