import { useMutation } from '@tanstack/react-query';
import { DeleteProgress } from './get&postProgress';
import useGetProgress from './useGetPlanProgress';

const useDeleteProgress = (trace_code) => {
  const { refetch } = useGetProgress(trace_code);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['delProgress', trace_code],
    mutationFn: (docId) => DeleteProgress(docId),
    onSettled: () => {
      refetch();
    },
    onError: () => {
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

export default useDeleteProgress;
