import { useMutation } from '@tanstack/react-query';
import { DeleteAudit } from './get&postAudit';
import useGetAudit from './useGetAudit';

const useDeleteAudit = (trace_code) => {
  const { refetch } = useGetAudit(trace_code);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['deleteDelAudit', trace_code],
    mutationFn: (docId) => DeleteAudit(docId),
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

export default useDeleteAudit;
