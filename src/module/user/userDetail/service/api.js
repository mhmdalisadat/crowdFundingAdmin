import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const getUserDetail = async (userId) => {
  const response = await api.get(`/api/information/user/admin/${userId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.success;
};

export const postOtpUser = async (nationalCode) => {
  const response = await api.post(
    `/api/otp/update/`,
    {uniqueIdentifier:nationalCode},
    {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

export const updateUser = async (data) => {
  
  const response = await api.patch(
    `/api/update/profile/`,
     data ,
    {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};
