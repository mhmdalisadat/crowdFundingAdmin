import { useMutation } from '@tanstack/react-query';
import useGetDocumentation from './useGetDocumentation';
import { PostDocument } from './api';

const usePostDocumentation = (trace_code) => {
  const { refetch } = useGetDocumentation(trace_code);
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['postdocument',trace_code],
    mutationFn: (postData) => PostDocument(trace_code, postData),
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

export default usePostDocumentation;





