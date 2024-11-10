/* eslint-disable no-shadow */
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postOtpUser } from './api';

const usePostOtpUser = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['postOtpUser'],
    mutationFn: (nationalCode) => postOtpUser(nationalCode),
    onSuccess: () => {
      toast.success('ارسال کد تایید با موفقیت انجام شد');
    },
    onError: (error) => {
      toast.error(`ارور: ${error.message || 'ارسال کد تایید با خطا روبه رو شد '}`);
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

export default usePostOtpUser;
