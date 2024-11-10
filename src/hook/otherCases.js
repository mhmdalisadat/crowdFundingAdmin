import axios from "axios";
import api from "src/api/apiClient";
import { getCookie } from "src/api/cookie";
import { OnRun } from "src/api/OnRun";

export const fetchOtherCases = async (id) => {
    try {
      const access = await getCookie('access');
  
      const response = await api.get(`/api/addinformation/admin/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching manager data:', error);
      throw new Error('Failed to fetch manager data.');
    }
  };
  

  
  export const sendOtherCases = async (id, data) => {
    try {
      const access = await getCookie('access');
      const url = `${OnRun}/api/addinformation/admin/${id}/`;
  
      const formData = new FormData();
      formData.append('claims_status', data.claims_status || '');
      formData.append('latest_insurance_staf', data.latest_insurance_staf || '');
      formData.append('bank_account_turnover', data.bank_account_turnover || '');
      formData.append('assets_and_liabilities', data.assets_and_liabilities || '');
      formData.append('statutes', data.statutes || '');
      formData.append('announcement_of_changes_capital', data.announcement_of_changes_capital || '');
      formData.append('announcement_of_changes_managers', data.announcement_of_changes_managers || '');
  
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error sending validation data:', error);
      throw new Error('Failed to send validation data.');
    }
  };
  