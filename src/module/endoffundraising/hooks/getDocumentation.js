import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

// تابع برای دریافت اطلاعات
const getData = async (id) => {
  const accessApi = getCookie('accessApi');
  const response = await axios.get(`${OnRun}/api/documation/recieve/admin/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessApi}`,
    },
  });
  return response.data;
};


const postDate = async (id, date) => {
  const accessApi = getCookie('accessApi');
  const response = await axios.post(`${OnRun}/api/documation/recieve/admin/${id}/`, { date }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessApi}`,
    },
  });
  return response.data;
};


const updateData = async (id, formData) => {
  const accessApi = getCookie('accessApi');
  const response = await axios.patch(`${OnRun}/api/documation/recieve/admin/${id}/`, formData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessApi}`,
    },
  });
  return response.data;
};

export const useFetchDocumentation = (id) => {

  const queryResult = useQuery({
    queryKey: ['documentation', id],
    queryFn: () => getData(id),
    enabled: !!id,
  });


  const postMutation = useMutation({
    mutationFn: (date) => postDate(id, date),
  });


  const updateMutation = useMutation({
    mutationFn: (formData) => updateData(id, formData),
  });

  

  return {
    ...queryResult,
    postDate: postMutation.mutateAsync,
    updateData: updateMutation.mutateAsync,
  };
};
