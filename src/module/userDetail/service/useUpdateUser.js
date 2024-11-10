/* eslint-disable no-shadow */
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUser } from './api';

const useUpdateUser = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ( data ) => updateUser(data),
    onSuccess: () => {
      toast.success('به روز رسانی کاربر با موفقیت انجام شد ');
    },
    onError: (error) => {
      toast.error(`ارور: ${error.message || 'به روز رسانی کاربر با خطا مواجه شد '}`);
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

export default useUpdateUser;
