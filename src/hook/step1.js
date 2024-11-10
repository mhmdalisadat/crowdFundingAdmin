/* eslint-disable no-restricted-syntax */
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const getStep1 = async (id) => {
  let response;
  if (id) {
    const access = await getCookie('access');

    response = await api.get(`/api/cart/detail/admin/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
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
          Lock_nationalid: false,
          registered_capital: '',
          Lock_registered_capital: false,
          personnel: null,
          Lock_personnel: false,
          company_kind: '',
          Lock_company_kind: false,
          amount_of_request: '10000000000',
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
          massage: '',
          logo: null,
        },
      },
    };
  }
  return response;
};

export const createCart = async (data, id) => {
  const formData = new FormData();
  formData.append('company_name', data.company_name || '');
  formData.append('activity_industry', data.activity_industry || '');
  formData.append('registration_number', data.registration_number || '');
  formData.append('nationalid', data.nationalid || '');
  formData.append('registered_capital', data.registered_capital || '');
  formData.append('personnel', data.personnel || '');
  formData.append('company_kind', data.company_kind || '');
  formData.append('amount_of_request', data.amount_of_request || '');
  formData.append('address', data.address || '');
  formData.append('city', data.city || '');
  formData.append('postal_code', data.postal_code || '');
  formData.append('email', data.email || '');
  formData.append('Lock_company_name', data.Lock_company_name);
  formData.append('Lock_company_kind', data.Lock_company_kind);
  formData.append('amount_of_request', data.amount_of_request);
  formData.append('Lock_nationalid', data.Lock_nationalid);
  formData.append('Lock_registration_number', data.Lock_registration_number);
  formData.append('Lock_registered_capital', data.Lock_registered_capital);
  formData.append('Lock_personnel', data.Lock_personnel);
  formData.append('Lock_email', data.Lock_email);
  formData.append('Lock_activity_industry', data.Lock_activity_industry);
  formData.append('Lock_address', data.Lock_address);
  formData.append('Lock_amount_of_request', data.Lock_amount_of_request);
  formData.append('Lock_financial_report_yearold', data.Lock_financial_report_yearold);
  formData.append('Lock_audit_report_yearold', data.Lock_audit_report_yearold);
  formData.append('Lock_statement_yearold', data.Lock_statement_yearold);
  formData.append('Lock_alignment_6columns_yearold', data.Lock_alignment_6columns_yearold);
  formData.append('Lock_financial_report_lastyear', data.Lock_financial_report_lastyear);
  formData.append('Lock_audit_report_lastyear', data.Lock_audit_report_lastyear);
  formData.append('Lock_statement_lastyear', data.Lock_statement_lastyear);
  formData.append('Lock_alignment_6columns_lastyear', data.Lock_alignment_6columns_lastyear);
  formData.append('Lock_alignment_6columns_thisyear', data.Lock_alignment_6columns_thisyear);
  formData.append(
    'Lock_announcement_of_changes_managers',
    data.Lock_announcement_of_changes_managers
  );
  formData.append(
    'Lock_announcement_of_changes_capital',
    data.Lock_announcement_of_changes_capital
  );
  formData.append('Lock_bank_account_turnover', data.Lock_bank_account_turnover);
  formData.append('Lock_statutes', data.Lock_statutes);
  formData.append('Lock_assets_and_liabilities', data.Lock_assets_and_liabilities);
  formData.append('Lock_latest_insurance_staf', data.Lock_latest_insurance_staf);
  formData.append('Lock_claims_status', data.Lock_claims_status);
  formData.append('Lock_logo', data.Lock_logo);
  formData.append('Lock_city', data.Lock_city);
  formData.append('Lock_postal_code', data.Lock_postal_code);

  if (data.alignment_6columns_thisyear && typeof data.alignment_6columns_thisyear !== 'string') {
    formData.append('alignment_6columns_thisyear', data.alignment_6columns_thisyear);
  }
  if (data.financial_report_lastyear && typeof data.financial_report_lastyear !== 'string') {
    formData.append('financial_report_lastyear', data.financial_report_lastyear);
  }
  if (data.audit_report_lastyear && typeof data.audit_report_lastyear !== 'string') {
    formData.append('audit_report_lastyear', data.audit_report_lastyear);
  }
  if (data.statement_lastyear && typeof data.statement_lastyear !== 'string') {
    formData.append('statement_lastyear', data.statement_lastyear);
  }
  if (data.financial_report_yearold && typeof data.financial_report_yearold !== 'string') {
    formData.append('financial_report_yearold', data.financial_report_yearold);
  }
  if (data.audit_report_yearold && typeof data.audit_report_yearold !== 'string') {
    formData.append('audit_report_yearold', data.audit_report_yearold);
  }
  if (data.statement_yearold && typeof data.statement_yearold !== 'string') {
    formData.append('statement_yearold', data.statement_yearold);
  }
  if (
    data.announcement_of_changes_managers &&
    typeof data.announcement_of_changes_managers !== 'string'
  ) {
    formData.append('announcement_of_changes_managers', data.announcement_of_changes_managers);
  }
  if (
    data.announcement_of_changes_capital &&
    typeof data.announcement_of_changes_capital !== 'string'
  ) {
    formData.append('announcement_of_changes_capital', data.announcement_of_changes_capital);
  }
  if (data.bank_account_turnover && typeof data.bank_account_turnover !== 'string') {
    formData.append('bank_account_turnover', data.bank_account_turnover);
  }
  if (data.statutes && typeof data.statutes !== 'string') {
    formData.append('statutes', data.statutes);
  }
  if (data.assets_and_liabilities && typeof data.assets_and_liabilities !== 'string') {
    formData.append('assets_and_liabilities', data.assets_and_liabilities);
  }
  if (data.latest_insurance_staf && typeof data.latest_insurance_staf !== 'string') {
    formData.append('latest_insurance_staf', data.latest_insurance_staf);
  }
  if (data.claims_status && typeof data.claims_status !== 'string') {
    formData.append('claims_status', data.claims_status);
  }
  if (data.logo && typeof data.logo !== 'string') {
    formData.append('logo', data.logo);
  }
  if (data.logo && typeof data.logo !== 'string') {
    formData.append('logo', data.city);
  }
  if (data.logo && typeof data.logo !== 'string') {
    formData.append('logo', data.postal_code);
  }

  const access = await getCookie('access');
  const response = await api.patch(`/api/cart/admin/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${access}`,
    },
    maxBodyLength: Infinity,
  });

  return response;
};
