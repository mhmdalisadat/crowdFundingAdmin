import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const postPlanDetail = async (data) => {
  const accessApi = getCookie('accessApi');

  const url = `/api/plan/admin/${data.id}/`;
  const formData = new FormData();
  formData.append('plan_name', data.plan_name || '');
  formData.append('company_name', data.company_name || '');
  formData.append('symbol', data.symbol || '');
  formData.append('funded_amount', data.funded_amount || '');
  formData.append('profit', data.profit || '');
  formData.append('total_time', data.total_time || '');
  formData.append('buoyancy', data.buoyancy || '');
  formData.append('payment_period', data.payment_period || '');
  formData.append('plan_status', data.plan_status || '');
  formData.append('activity_field', data.activity_field || '');
  formData.append('remaining_date_to', data.remaining_date_to || '');
  formData.append('remaining_from_to', data.remaining_from_to || '');
  formData.append('marketer', data.marketer || '');
  formData.append('farabours_link', data.farabours_link || '');
  formData.append('applicant_funding_percentage', data.applicant_funding_percentage || '');
  formData.append('amount_of_shareholders', data.amount_of_shareholders || '');
  formData.append('nominal_price_certificate', data.nominal_price_certificate || '');
  formData.append('description', data.description || '');

  const response = await api.patch(url, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const usePlanDetailPost = () => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['planDetailPost'],
    mutationFn: postPlanDetail,
  });

  return { mutate, isPending, error };
};

export default usePlanDetailPost;
