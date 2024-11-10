import { useMutation } from '@tanstack/react-query';
import { PostAudit } from './get&postAudit'; 
import useGetAudit from './useGetAudit';

const usePostAudit = (trace_code) => {
  const { refetch } = useGetAudit(trace_code);
  const { date, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostAudit', trace_code],
    mutationFn: (postData) => PostAudit(trace_code, postData),
    onSettled: () => {
      refetch();
    },
    onError:()=>{
      refetch();
    }
  });
  return {
    date,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostAudit;