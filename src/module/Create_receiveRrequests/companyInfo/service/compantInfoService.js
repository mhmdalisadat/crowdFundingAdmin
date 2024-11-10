/* eslint-disable no-restricted-syntax */
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const fetchCompany = async (id) => {
  let response;
  if (id) {
    const accessApi = getCookie('accessApi');

    response = await api.get(`/api/cart/detail/admin/${id}/`, {
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
          lock_city: false,
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
          date_newspaper: null,
          logo: null,
          lock_exchange_code: false,
          Lock_year_of_establishment: false,
          exchange_code: null,
          year_of_establishment: null,
          lock_amount_of_registered_shares: false,
          lock_newspaper: false,
          lock_date_newspaper: false,
          lock_year_of_establishment: false,
          lock_postal_code: false,
          Lock_logo: false,
        },
      },
    };
  }
  return response;
};

export const createCart = async (data, id) => {
  const formData = new FormData();
  formData.append('company_name', data.company_name || '');
  formData.append('exchange_code', data.exchange_code || '');
  formData.append('year_of_establishment', data.year_of_establishment || '');
  formData.append('amount_of_registered_shares', data.amount_of_registered_shares || '');
  formData.append('date_newspaper', data.date_newspaper || '');
  formData.append('newspaper', data.newspaper || '');
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
  formData.append('amount_of_request', data.amount_of_request);
  formData.append('Lock_company_name', data.Lock_company_name);
  formData.append('Lock_company_kind', data.Lock_company_kind);
  formData.append('Lock_nationalid', data.Lock_nationalid);
  formData.append('Lock_registration_number', data.Lock_registration_number);
  formData.append('Lock_registered_capital', data.Lock_registered_capital);
  formData.append('Lock_personnel', data.Lock_personnel);
  formData.append('Lock_email', data.Lock_email);
  formData.append('Lock_city', data.Lock_city);
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
  formData.append('lock_year_of_establishment', data.lock_year_of_establishment);
  formData.append('lock_amount_of_registered_shares', data.lock_amount_of_registered_shares);
  formData.append('Lock_newspaper', data.Lock_newspaper);
  formData.append('Lock_date_newspaper', data.Lock_date_newspaper);
  formData.append('lock_postal_code', data.lock_postal_code);
  formData.append('Lock_logo', data.Lock_logo);
  

  if (data.date_newspaper) {
    formData.append('date_newspaper', data.date_newspaper);
  }
  if (data.year_of_establishment) {
    formData.append('year_of_establishment', data.year_of_establishment);
  }

  formData.append(
    'Lock_announcement_of_changes_managers',
    data.Lock_announcement_of_changes_managers
  );
  formData.append(
    'Lock_announcement_of_changes_capital',
    data.Lock_announcement_of_changes_capital
  );
  formData.append('Lock_bank_account_turnover', data.Lock_bank_account_turnover);
  formData.append('lock_exchange_code', data.lock_exchange_code);
  formData.append('Lock_statutes', data.Lock_statutes);
  formData.append('Lock_assets_and_liabilities', data.Lock_assets_and_liabilities);
  formData.append('Lock_latest_insurance_staf', data.Lock_latest_insurance_staf);
  formData.append('Lock_claims_status', data.Lock_claims_status);
  formData.append('lock_logo', data.lock_logo);
  formData.append('lock_city', data.lock_city);
  formData.append('Lock_postal_code', data.Lock_postal_code);

    formData.append('alignment_6columns_thisyear', data.alignment_6columns_thisyear);
    formData.append('financial_report_lastyear', data.financial_report_lastyear);
    formData.append('audit_report_lastyear', data.audit_report_lastyear);
    formData.append('statement_lastyear', data.statement_lastyear);
    formData.append('financial_report_yearold', data.financial_report_yearold);
    formData.append('audit_report_yearold', data.audit_report_yearold);
    formData.append('statement_yearold', data.statement_yearold);

    formData.append('announcement_of_changes_managers', data.announcement_of_changes_managers);


    formData.append('announcement_of_changes_capital', data.announcement_of_changes_capital);


    formData.append('amount_of_registered_capital', data.amount_of_registered_capital);

    formData.append('bank_account_turnover', data.bank_account_turnover);
    formData.append('statutes', data.statutes);
    formData.append('assets_and_liabilities', data.assets_and_liabilities);
    formData.append('latest_insurance_staf', data.latest_insurance_staf);
    formData.append('claims_status', data.claims_status);
    formData.append('logo', data.logo);

  const accessApi = getCookie('accessApi');
  const response = await api.patch(`/api/cart/admin/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessApi}`,
    },
    maxBodyLength: Infinity,
  });

  return response;
};
