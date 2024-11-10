import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

const GetParticipant = async (id) => {
  const response = await api.get(`api/bank/reciept/payment/admin/${id}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

const useGetReciept = (id) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['reciept', id],
    queryFn: () => GetParticipant(id),
  });
  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useGetReciept;
