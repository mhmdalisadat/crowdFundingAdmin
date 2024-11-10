import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const grtOtherCases = async (cartId) => {
  const response = await api.get(`/api/addinformation/admin/${cartId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response?.data;
};


export const postOtherCases = async ({cartId, localData}) => {
  const formData = new FormData();
  formData.append('claims_status', localData.claims_status || '');
  formData.append('latest_insurance_staf', localData.latest_insurance_staf || '');
  formData.append('auditor_representative', localData.auditor_representative || '');
  formData.append('bank_account_turnover', localData.bank_account_turnover || '');
  formData.append('assets_and_liabilities', localData.assets_and_liabilities || '');
  formData.append('statutes', localData.statutes || '');
  formData.append('product_catalog', localData.product_catalog || '');
  formData.append('bank_account_turnover', localData.bank_account_turnover || '');
  formData.append('licenses', localData.licenses || '');
  formData.append('product_catalog', localData.product_catalog || '');
  formData.append('announcing_account_number', localData.announcing_account_number || '');
  formData.append('announcement_of_changes_capital', localData.announcement_of_changes_capital || '');
  formData.append('announcement_of_changes_managers', localData.announcement_of_changes_managers || '');
  formData.append('lock_claims_status', localData.lock_claims_status);
  formData.append('lock_product_catalog', localData.lock_product_catalog);
  formData.append('lock_licenses', localData.lock_licenses);
  formData.append('lock_announcing_account_number', localData.lock_announcing_account_number);
  formData.append('lock_latest_insurance_staf', localData.lock_latest_insurance_staf);
  formData.append('lock_bank_account_turnover', localData.lock_bank_account_turnover );
  formData.append('lock_assets_and_liabilities', localData.lock_assets_and_liabilities );
  formData.append('lock_statutes', localData.lock_statutes );
  formData.append('lock_auditor_representative', localData.lock_auditor_representative);
  formData.append('lock_announcement_of_changes_capital', localData.lock_announcement_of_changes_capital );
  formData.append('lock_announcement_of_changes_managers', localData.lock_announcement_of_changes_managers );

  

  const response = await api.post(`/api/addinformation/admin/${cartId}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

 