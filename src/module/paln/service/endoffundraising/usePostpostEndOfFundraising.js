import { useMutation } from '@tanstack/react-query';
import { postEndOfFundraising } from './api';

const usePostEndOfFundraising = (trace_code) => {
  const { data, mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['PostEndOfFundraising', trace_code],
    mutationFn: ({ updatedData }) => postEndOfFundraising({ trace_code, updatedData }),
  });

  return {
    data,
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostEndOfFundraising;
