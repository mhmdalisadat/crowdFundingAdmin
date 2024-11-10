import { useMutation } from '@tanstack/react-query';
import useGetGuarante from './useGetGuarante';
import { DeleteGuarante } from './guaranteService';

const useDeleteGuarante = (trace_code) => {
  const { refetch } = useGetGuarante(trace_code);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['deleteDocumentation', trace_code],
    mutationFn: (docId) => DeleteGuarante(docId),
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

export default useDeleteGuarante;
