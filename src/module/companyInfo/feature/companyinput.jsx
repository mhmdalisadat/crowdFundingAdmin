/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import GlobalTextField from 'src/components/fild/textfiled';
import DatePicker from 'react-multi-date-picker';
import { cleanNumber, formatNumber } from '../../../utils/formatNumbers';

const CompanyInfoInput = ({ localData, setLocalData, handleRangeChange }) => {
  const handleChange = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };
  const handleDateChangeNewse = (date) => {
    const updatedData = { ...localData };
    updatedData.date_newspaper = new Date(date).toISOString();
    setLocalData(updatedData);
  };
  const handleDateChange = (date) => {
    const updatedData = { ...localData };
    updatedData.year_of_establishment = new Date(date).toISOString();
    setLocalData(updatedData);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Switch
            name="Lock_company_name"
            inputProps={{ 'aria-label': 'controlled' }}
            className="mr-4"
            checked={localData.Lock_company_name ?? false } 
            onChange={(e) => setLocalData({ ...localData, Lock_company_name: e.target.checked })}
          />

          <GlobalTextField
            id="company_name"
            label="نام شرکت"
            value={localData.company_name || ''}
            onChange={(e) => setLocalData({ ...localData, company_name: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_company_kind"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_company_kind ?? false }
              onChange={(e) => setLocalData({ ...localData, Lock_company_kind: e.target.checked })}
            />
          </div>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="company_kind">نوع شرکت</InputLabel>
            <Select
              inputProps={{ 'aria-label': 'controlled' }}
              labelId="company_kind"
              name="company_kind"
              value={localData.company_kind || ''}
              onChange={(e) => {
                const { value } = e.target;
                handleChange('company_kind', value);
              }}
              label="نوع شرکت"
            >
              <MenuItem value="1">شرکت سهامی سجام</MenuItem>
              <MenuItem value="2">شرکت با مسولیت محدود</MenuItem>
              <MenuItem value="3">شرکت تضامنی</MenuItem>
              <MenuItem value="4">شرکت مختلط(سهامی و غیر سهامی)</MenuItem>
              <MenuItem value="5">شرکت نسبی</MenuItem>
              <MenuItem value="6">شرکت تعاونی</MenuItem>
              <MenuItem value="7">شرکت دانش بنیان</MenuItem>
              <MenuItem value="8">سهامی خاص</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_nationalid"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_nationalid ?? false}
              onChange={(e) => setLocalData({ ...localData, Lock_nationalid: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="nationalid"
            label="شماره شناسه"
            type="number"
            value={localData.nationalid}
            onChange={(e) => setLocalData({ ...localData, nationalid: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_registration_number"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_registration_number ?? false}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_registration_number: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            type="number"
            label="شماره ثبت"
            value={localData.registration_number}
            onChange={(e) => setLocalData({ ...localData, registration_number: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_registered_capital"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_registered_capital ?? false}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_registered_capital: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            id="registered_capital"
            label="سرمایه ثبتی (ریال)"
            value={formatNumber(localData.registered_capital)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const validInput = inputValue.replace(/[^0-9,]/g, '');
              const cleanedValue = cleanNumber(validInput);
              setLocalData({ ...localData, registered_capital: cleanedValue });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="lock_amount_of_registered_capital"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.lock_amount_of_registered_shares ?? false}
              onChange={(e) =>
                setLocalData({ ...localData, lock_amount_of_registered_shares: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            label="تعداد سهام ثبتی"
            value={formatNumber(localData.amount_of_registered_shares ?? 0)}
            onChange={(e) => {
              const inputValue = e.target.value;
              const validInput = inputValue.replace(/[^0-9]/g, '');
              const cleanedValue = cleanNumber(validInput);
              setLocalData({ ...localData, amount_of_registered_shares: cleanedValue });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_newspaper"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_newspaper ?? false}
              onChange={(e) => setLocalData({ ...localData, Lock_newspaper: e.target.checked })}
            />
          </div>
          <GlobalTextField
            type="number"
            label="شماره روزنامه رسمی آخرین مدیران"
            value={localData.newspaper}
            onChange={(e) => setLocalData({ ...localData, newspaper: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="mb-6">
            <div className="flex items-center">
              <label className="block text-gray-800 text-[10px] text-nowrap font-semibold mb-0">
                تاریخ روزنامه رسمی آخرین مدیران:
              </label>
              <Switch
                name="Lock_date_newspaper"
                inputProps={{ 'aria-label': 'controlled' }}
                checked={localData.Lock_date_newspaper ?? false}
                onChange={(e) =>
                  setLocalData({ ...localData, Lock_date_newspaper: e.target.checked })
                }
              />
            </div>

            <DatePicker
              style={{
                width: '100%',
                padding: 24,
                backgroundColor: '#ffffff',
              }}
              value={localData.date_newspaper ? new Date(localData.date_newspaper) : null}
              onChange={handleDateChangeNewse}
              calendar={persian}
              locale={persian_fa}
              className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_personnel"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_personnel ?? false}
              onChange={(e) => setLocalData({ ...localData, Lock_personnel: e.target.checked })}
            />
          </div>
          <GlobalTextField
            type="number"
            label="تعداد کارکنان"
            value={localData.personnel}
            onChange={(e) => setLocalData({ ...localData, personnel: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="lock_city"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.lock_city ?? false}
              onChange={(e) => setLocalData({ ...localData, lock_city: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="city"
            label="شهر محل ثبت"
            value={localData.city}
            onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_address"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_address ?? false}
              onChange={(e) => setLocalData({ ...localData, Lock_address: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="address"
            label="آدرس شرکت"
            value={localData.address}
            onChange={(e) => setLocalData({ ...localData, address: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div className="mb-6">
            <div className="flex items-center">
              <label className="block text-gray-800 text-xs font-semibold mb-2">
                تاریخ تاسیس :
              </label>
              <Switch
                name="lock_year_of_establishment"
                inputProps={{ 'aria-label': 'controlled' }}
                className="ml-4"
                checked={localData.lock_year_of_establishment ?? false}
                onChange={(e) =>
                  setLocalData({ ...localData, lock_year_of_establishment: e.target.checked })
                }
              />
            </div>
            <DatePicker
              style={{
                width: '100%',
                padding: 24,
                backgroundColor: '#ffffff',
              }}
              value={
                localData.year_of_establishment ? new Date(localData.year_of_establishment) : null
              }
              onChange={handleDateChange}
              calendar={persian}
              locale={persian_fa}
              className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="lock_exchange_code"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.lock_exchange_code ?? false}
              onChange={(e) => setLocalData({ ...localData, lock_exchange_code: e.target.checked })}
            />
          </div>
          <GlobalTextField
            type="number"
            label="کد بورسی"
            value={localData.exchange_code}
            onChange={(e) => setLocalData({ ...localData, exchange_code: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="lock_postal_code"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.lock_postal_code ?? false}
              onChange={(e) => setLocalData({ ...localData, lock_postal_code: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="postal_code"
            label="کد پستی"
            value={localData.postal_code}
            onChange={(e) => setLocalData({ ...localData, postal_code: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_email"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_email ?? false}
              onChange={(e) => setLocalData({ ...localData, Lock_email: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="email"
            label="ایمیل شرکت"
            value={localData.email}
            onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <div dir="ltr">
            <Switch
              name="Lock_activity_industry"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_activity_industry ?? false}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_activity_industry: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            id="activity_industry"
            label="موضوع فعالیت شرکت"
            value={localData.activity_industry}
            onChange={(e) => setLocalData({ ...localData, activity_industry: e.target.value })}
          />
        </Grid>
      </Grid>

      <Box
        mt={8}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" mb={2}>
          <label className="block text-gray-700 text-sm font-medium">
            میزان منابع درخواستی (ریال):
          </label>
          <div dir="ltr">
            <Switch
              name="Lock_amount_of_request"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_amount_of_request ?? false}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_amount_of_request: e.target.checked })
              }
            />
          </div>
        </Box>
        <input
          type="range"
          name="amount_of_request"
          min={10000000000}
          max={250000000000}
          step={10000000000}
          value={localData.amount_of_request}
          onChange={handleRangeChange}
          className="w-full"
        />
        <span className="block text-gray-700 text-sm mt-4 text-center">
          {formatNumber(localData.amount_of_request)} ریال
        </span>
      </Box>
    </>
  );
};

CompanyInfoInput.propTypes = {
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
  handleRangeChange: PropTypes.func,
};

export default CompanyInfoInput;
