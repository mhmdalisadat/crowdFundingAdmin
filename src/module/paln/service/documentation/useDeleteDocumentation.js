import { useMutation } from '@tanstack/react-query';
import { DeleteDocument } from './api';
import useGetDocumentation from './useGetDocumentation';

const useDeleteDocumentation = (trace_code) => {
  const { refetch } = useGetDocumentation(trace_code);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['deleteDocumentation', trace_code],
    mutationFn: (docId) => DeleteDocument(docId),
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

export default useDeleteDocumentation;
