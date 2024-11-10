import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useGetGuaranty from './useGetGuaranty';
import { DeleteGuaranty } from './api';

const useDeleteGuarante = (trace_code) => {
  const { refetch } = useGetGuaranty(trace_code);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['DeleteGuaranty', trace_code],
    mutationFn: (docId) => DeleteGuaranty(trace_code, docId),
    onSettled: () => {
      refetch();
    },
    onSuccess: () => {
      toast.success('حذف با موفقیت انجام شد!');
    },
    onError: () => {
      toast.error('خطا در حذف، لطفاً دوباره تلاش کنید.');
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
