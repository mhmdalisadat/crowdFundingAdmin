import { useMutation } from '@tanstack/react-query';
import useGetShereholder from './useGetShareholder';
import { sendShareholder } from './shereholderservice';

const usePostShereHolder = (cartId) => {
  const { refetch } = useGetShereholder(cartId);
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['postShereholder'],
    mutationFn: ({ formSections }) => sendShareholder( cartId, formSections ),
    onSettled: () => {
      setTimeout(() => {
        refetch();
      }, 500); 
    },
  });
  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default usePostShereHolder;
