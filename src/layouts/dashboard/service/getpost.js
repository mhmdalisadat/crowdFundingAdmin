import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { LogOut } from './logout';

const usePostLogOut = () => {
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['logOut'],
    mutationFn: () => LogOut(),
    onSettled: () => {
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      router.push('/login');
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
};

export default usePostLogOut;
