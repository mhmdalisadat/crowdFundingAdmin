/* eslint-disable no-restricted-syntax */
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const getCompanyInfo = async (cartId) => {
  let response;
  if (cartId) {
    const accessApi = getCookie('accessApi');

    response = await api.get(`/api/cart/detail/admin/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
  } else {
    response = {
      data: {
        cart: {
          company_name: '',
          Lock_company_name: false,
          activity_industry: '',
          Lock_activity_industry: false,
          registration_number: '',
          Lock_registration_number: false,
          nationalid: '',
          amount_of_registered_shares: '',
          Lock_nationalid: false,
          registered_capital: '',
          Lock_amount_of_registered_shares: false,
          personnel: null,
          Lock_personnel: false,
          company_kind: '',
          Lock_company_kind: false,
          amount_of_request: '',
          Lock_amount_of_request: false,
          code: null,
          email: '',
          Lock_email: false,
          address: '',
          city: null,
          postal_code: null,
          Lock_address: false,
          financial_report_thisyear: null,
          Lock_financial_report_thisyear: false,
          financial_report_lastyear: null,
          Lock_financial_report_lastyear: false,
          financial_report_yearold: null,
          Lock_financial_report_yearold: false,
          audit_report_thisyear: null,
          Lock_audit_report_thisyear: false,
          audit_report_lastyear: null,
          Lock_audit_report_lastyear: false,
          audit_report_yearold: null,
          Lock_audit_report_yearold: false,
          statement_thisyear: null,
          Lock_statement_thisyear: false,
          statement_lastyear: null,
          Lock_statement_lastyear: false,
          statement_yearold: null,
          Lock_statement_yearold: false,
          alignment_6columns_thisyear: null,
          Lock_alignment_6columns_thisyear: false,
          alignment_6columns_lastyear: null,
          Lock_alignment_6columns_lastyear: false,
          alignment_6columns_yearold: null,
          Lock_alignment_6columns_yearold: false,
          announcement_of_changes_managers: null,
          Lock_announcement_of_changes_managers: false,
          announcement_of_changes_capital: null,
          Lock_announcement_of_changes_capital: false,
          bank_account_turnover: null,
          Lock_bank_account_turnover: false,
          statutes: null,
          Lock_statutes: false,
          assets_and_liabilities: null,
          Lock_assets_and_liabilities: false,
          latest_insurance_staf: null,
          Lock_latest_insurance_staf: false,
          claims_status: null,
          Lock_claims_status: false,
          massage: null,
          date_newspaper: '',
          logo: null,
          Lock_exchange_code: false,
          Lock_year_of_establishment: false,
          Lock_amount_of_registered_capital: false,
          exchange_code: null,
          year_of_establishment: null,
        },
      },
    };
  }
  return response
};

export const postCompanyInfo = async (cartId, localData) => {    
  
  const formData = new FormData();
  formData.append('company_name', localData.company_name || '');
  formData.append('exchange_code', localData.exchange_code || '');
  formData.append('year_of_establishment', localData.year_of_establishment || '');
  formData.append('amount_of_registered_shares', localData.amount_of_registered_shares || '');
  formData.append('date_newspaper', localData.date_newspaper || '');
  formData.append('newspaper', localData.newspaper || '');
  formData.append('activity_industry', localData.activity_industry || '');
  formData.append('registration_number', localData.registration_number || '');
  formData.append('nationalid', localData.nationalid || '');
  formData.append('registered_capital', localData.registered_capital || '');
  formData.append('personnel', localData.personnel || '');
  formData.append('company_kind', localData.company_kind || '');
  formData.append('amount_of_request', localData.amount_of_request || '');
  formData.append('address', localData.address || '');
  formData.append('city', localData.city || '');
  formData.append('postal_code', localData.postal_code || '');
  formData.append('email', localData.email || '');
  formData.append('Lock_company_name', localData.Lock_company_name);
  formData.append('Lock_company_kind', localData.Lock_company_kind);
  formData.append('amount_of_request', localData.amount_of_request);
  formData.append('Lock_nationalid', localData.Lock_nationalid);
  formData.append('Lock_registration_number', localData.Lock_registration_number);
  formData.append('Lock_registered_capital', localData.Lock_registered_capital);
  formData.append('Lock_personnel', localData.Lock_personnel);
  formData.append('Lock_email', localData.Lock_email);
  formData.append('Lock_activity_industry', localData.Lock_activity_industry);
  formData.append('Lock_address', localData.Lock_address);
  formData.append('Lock_amount_of_request', localData.Lock_amount_of_request);
  formData.append('Lock_financial_report_yearold', localData.Lock_financial_report_yearold);
  formData.append('Lock_audit_report_yearold', localData.Lock_audit_report_yearold);
  formData.append('Lock_statement_yearold', localData.Lock_statement_yearold);
  formData.append('Lock_alignment_6columns_yearold', localData.Lock_alignment_6columns_yearold);
  formData.append('Lock_financial_report_lastyear', localData.Lock_financial_report_lastyear);
  formData.append('Lock_audit_report_lastyear', localData.Lock_audit_report_lastyear);
  formData.append('Lock_statement_lastyear', localData.Lock_statement_lastyear);
  formData.append('Lock_alignment_6columns_lastyear', localData.Lock_alignment_6columns_lastyear);
  formData.append('Lock_alignment_6columns_thisyear', localData.Lock_alignment_6columns_thisyear);
  formData.append('Lock_year_of_establishment', localData.Lock_year_of_establishment);
  formData.append(
    'Lock_announcement_of_changes_managers',
    localData.Lock_announcement_of_changes_managers
  );
  formData.append(
    'Lock_announcement_of_changes_capital',
    localData.Lock_announcement_of_changes_capital
  );
  formData.append('Lock_bank_account_turnover', localData.Lock_bank_account_turnover);
  formData.append('Lock_exchange_code', localData.Lock_exchange_code);
  formData.append('Lock_statutes', localData.Lock_statutes);
  formData.append('Lock_assets_and_liabilities', localData.Lock_assets_and_liabilities);
  formData.append('Lock_latest_insurance_staf', localData.Lock_latest_insurance_staf);
  formData.append('Lock_claims_status', localData.Lock_claims_status);
  formData.append('Lock_logo', localData.Lock_logo);
  formData.append('Lock_city', localData.Lock_city);
  formData.append('Lock_postal_code', localData.Lock_postal_code);
  formData.append('alignment_6columns_thisyear', localData.alignment_6columns_thisyear);
  formData.append('financial_report_lastyear', localData.financial_report_lastyear);
  formData.append('audit_report_lastyear', localData.audit_report_lastyear);
  formData.append('statement_lastyear', localData.statement_lastyear);
  formData.append('financial_report_yearold', localData.financial_report_yearold);
  formData.append('statement_yearold', localData.statement_yearold);
  formData.append('announcement_of_changes_managers', localData.announcement_of_changes_managers);
  formData.append('announcement_of_changes_capital', localData.announcement_of_changes_capital);
  formData.append('amount_of_registered_capital', localData.amount_of_registered_capital);
  formData.append('bank_account_turnover', localData.bank_account_turnover);
  formData.append('statutes', localData.statutes);
  formData.append('assets_and_liabilities', localData.assets_and_liabilities);
  formData.append('latest_insurance_staf', localData.latest_insurance_staf);
  formData.append('claims_status', localData.claims_status);
  formData.append('logo', localData.logo);

  const accessApi = getCookie('access');
  const response = await api.patch(`/api/cart/admin/${cartId}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessApi}`,
    },
    maxBodyLength: Infinity,
  });
  
  return response;
};
