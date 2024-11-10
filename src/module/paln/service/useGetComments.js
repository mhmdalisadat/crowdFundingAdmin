const { useQuery } = require('@tanstack/react-query');
const { getComments } = require('./api');

const useGetComments = (trac_code) => {
  const { data, isError, isPending, isSuccess, refetch } = useQuery({
    queryKey: ['comments',trac_code],
    queryFn: () => getComments(trac_code),
  });
  return {
    data,
    isError,
    isPending,
    isSuccess,
    refetch,
  };
};

export default useGetComments;
