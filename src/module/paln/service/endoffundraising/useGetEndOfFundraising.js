import { useQuery } from '@tanstack/react-query';
import { getEndOfFundraising } from './api';

const useGetEndOfFundraising = ( trace_code) => {
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ['GetEndOfFundraising', trace_code],
        queryFn: () => getEndOfFundraising(trace_code),
    });
 

  return {
    data,
    isPending,
    isError,
    isSuccess,
  };
};

export default useGetEndOfFundraising;
