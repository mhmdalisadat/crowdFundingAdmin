/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  Grid,
  Switch,
  Button,
  Typography,
  FormLabel,
  Input,
  Select,
  InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1, createCart } from 'src/hook/step1';
import { toast } from 'react-toastify';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { Link } from 'react-router-dom';
import useNavigateStep from 'src/hooks/use-navigate-step';
import UseCartId from 'src/hooks/card_id';
import Label from './label';

const FormCompanyInfo = ({ onFileChange }) => {
  const { incrementPage } = useNavigateStep();
  const { cartId } = UseCartId();

  const [clicked, setClicked] = useState(false);

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const mutation = useMutation({ mutationFn: () => createCart(localData, cartId) });

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cartId],
    queryFn: () => getStep1(cartId),
  });

  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {
    if (isSuccess && data) {
      setLocalData(data.data.cart);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.warning(error);
    }
  }, [isError, error]);

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setLocalData({
      ...localData,
      amount_of_request: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    mutation.mutateAsync(localData, cartId);
    incrementPage();
  };

  if (isLoading) {
    return <p>loading ....</p>;
  }
  if (isError) {
    return <p>error ....</p>;
  }
  if (!data) {
    return <p>data ....</p>;
  }

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  return localData ? (
    <div dir="rtl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box
          p={3}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          sx={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-200   text-white rounded-t-3xl p-6 text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-700">اطلاعات شرکت</h1>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_company_name"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="mr-4"
                    checked={localData.Lock_company_name}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_company_name: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="company_name"
                  label="نام شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.company_name}
                  onChange={(e) => setLocalData({ ...localData, company_name: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_company_kind"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_company_kind}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_company_kind: e.target.checked })
                    }
                  />
                </div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="company_kind-label">نوع شرکت</InputLabel>
                  <Select
                    inputProps={{ 'aria-label': 'controlled' }}
                    labelId="company_kind-label"
                    name="company_kind"
                    value={localData.company_kind}
                    onChange={(e) => setLocalData({ ...localData, company_kind: e.target.value })}
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

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_nationalid"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_nationalid}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_nationalid: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="nationalid"
                  label="شماره شناسه"
                  variant="outlined"
                  fullWidth
                  value={localData.nationalid}
                  onChange={(e) => setLocalData({ ...localData, nationalid: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_registration_number"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_registration_number}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_registration_number: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="registration_number"
                  label="شماره ثبت"
                  variant="outlined"
                  fullWidth
                  value={localData.registration_number}
                  onChange={(e) =>
                    setLocalData({ ...localData, registration_number: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_registered_capital"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_registered_capital}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_registered_capital: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="registered_capital"
                  label="سرمایه ثبتی (ریال)"
                  variant="outlined"
                  fullWidth
                  value={formatNumber(localData.registered_capital)}
                  onChange={(e) =>
                    setLocalData({ ...localData, registered_capital: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_personnel"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_personnel}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_personnel: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="personnel"
                  label="تعداد کارکنان"
                  variant="outlined"
                  fullWidth
                  value={localData.personnel}
                  onChange={(e) => setLocalData({ ...localData, personnel: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_email"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_email}
                    onChange={(e) => setLocalData({ ...localData, Lock_email: e.target.checked })}
                  />
                </div>
                <TextField
                  name="email"
                  label="ایمیل شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.email}
                  onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_activity_industry"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_activity_industry}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_activity_industry: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="activity_industry"
                  label="موضوع فعالیت شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.activity_industry}
                  onChange={(e) =>
                    setLocalData({ ...localData, activity_industry: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_newspaper"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_newspaper}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_newspaper: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="newspaper"
                  label="شماره روزنامه رسمی"
                  variant="outlined"
                  fullWidth
                  value={localData.newspaper}
                  onChange={(e) => setLocalData({ ...localData, newspaper: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_date_newspaper"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_date_newspaper}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_date_newspaper: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="date_newspaper"
                  label="تاریخ روزنامه رسمی"
                  variant="outlined"
                  fullWidth
                  value={localData.date_newspaper}
                  onChange={(e) => setLocalData({ ...localData, date_newspaper: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_postal_code"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_postal_code}
                    onChange={(e) =>
                      setLocalData({ ...localData, Lock_postal_code: e.target.checked })
                    }
                  />
                </div>
                <TextField
                  name="postal_code"
                  label="کد پستی"
                  variant="outlined"
                  fullWidth
                  value={localData.postal_code}
                  onChange={(e) => setLocalData({ ...localData, postal_code: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <div dir="ltr">
                  <Switch
                    name="Lock_city"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_city}
                    onChange={(e) => setLocalData({ ...localData, Lock_city: e.target.checked })}
                  />
                </div>
                <TextField
                  name="city"
                  label="شهر"
                  variant="outlined"
                  fullWidth
                  value={localData.city}
                  onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <div dir="ltr">
                  <Switch
                    name="Lock_address"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_address}
                    onChange={(e) => setLocalData({ ...localData, Lock_address: e.target.checked })}
                  />
                </div>
                <TextField
                  name="address"
                  label="آدرس شرکت"
                  variant="outlined"
                  fullWidth
                  value={localData.address}
                  onChange={(e) => setLocalData({ ...localData, address: e.target.value })}
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
                <Label className="block text-gray-700 text-sm font-medium">
                  میزان منابع درخواستی (ریال):
                </Label>
                <div dir="ltr">
                  <Switch
                    name="Lock_amount_of_request"
                    inputProps={{ 'aria-label': 'controlled' }}
                    className="ml-4"
                    checked={localData.Lock_amount_of_request}
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

            <Box display="flex" justifyContent="center" width="100%" mt={4}>
              <div className="mt-10 ">
                <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-700">پیوست اسناد</h1>
                </div>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '20px',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      justifyContent: 'center',
                      maxWidth: '1200px',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        گزارشات و مستندات منتهی به سال 1402
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            صورت مالی
                            <Switch
                              name="Lock_financial_report_lastyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_financial_report_lastyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_financial_report_lastyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.financial_report_lastyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.financial_report_lastyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button onClick={() => handleFileRemove('financial_report_lastyear')}>
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="financial_report_lastyear"
                              type="file"
                              id="file-upload-lastyear-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  financial_report_lastyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            گزارش حسابرسی
                            <Switch
                              name="Lock_audit_report_lastyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_audit_report_lastyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_audit_report_lastyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.audit_report_lastyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.audit_report_lastyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    audit_report_lastyear: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="audit_report_lastyear"
                              type="file"
                              id="file-upload-lastyear-audit_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  audit_report_lastyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            اظهارنامه
                            <Switch
                              name="Lock_statement_lastyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_statement_lastyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_statement_lastyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.statement_lastyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.statement_lastyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    statement_lastyear: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="statement_lastyear"
                              type="file"
                              id="file-upload-lastyear-statement"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  statement_lastyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        گزارشات و مستندات منتهی به سال 1401
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            صورت مالی
                            <Switch
                              name="Lock_financial_report_yearold"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_financial_report_yearold}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_financial_report_yearold: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.financial_report_yearold ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.financial_report_yearold}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    financial_report_yearold: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="financial_report_yearold"
                              type="file"
                              id="file-upload-yearold-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  financial_report_yearold: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            گزارش حسابرسی
                            <Switch
                              name="Lock_audit_report_yearold"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_audit_report_yearold}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_audit_report_yearold: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.audit_report_yearold ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.audit_report_yearold}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    audit_report_yearold: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="audit_report_yearold"
                              type="file"
                              id="file-upload-yearold-audit_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  audit_report_yearold: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            اظهار نامه
                            <Switch
                              name="Lock_statement_yearold"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_statement_yearold}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_statement_yearold: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.statement_yearold ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.statement_yearold}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    statement_yearold: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="statement_yearold"
                              type="file"
                              id="file-upload-yearold-statement"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  statement_yearold: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        گزارشات و مستندات به روز
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            تراز 6 ستونی
                            <Switch
                              name="Lock_alignment_6columns_thisyear"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_alignment_6columns_thisyear}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_alignment_6columns_thisyear: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.alignment_6columns_thisyear ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.alignment_6columns_thisyear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    alignment_6columns_thisyear: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="alignment_6columns_thisyear"
                              type="file"
                              id="file-upload-thisyear-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  alignment_6columns_thisyear: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '24px',
                        marginBottom: '24px',
                        width: { xs: '100%', sm: '48%' },
                        border: '1px solid #ccc',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: '16px',
                          textAlign: 'center',
                          color: '#424242',
                          fontWeight: 'bold',
                          borderBottom: '1px solid #e0e0e0',
                          paddingBottom: '16px',
                        }}
                      >
                        لوگو شرکت
                      </Typography>

                      <Box sx={{ marginBottom: '16px' }}>
                        <FormControl fullWidth>
                          <FormLabel
                            sx={{
                              color: '#424242',
                              fontSize: '14px',
                              fontWeight: 'medium',
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            فایل لوگو
                            <Switch
                              name="Lock_logo"
                              inputProps={{ 'aria-label': 'controlled' }}
                              sx={{ marginLeft: '8px' }}
                              checked={localData.Lock_logo}
                              onChange={(e) =>
                                setLocalData({
                                  ...localData,
                                  Lock_logo: e.target.checked,
                                })
                              }
                            />
                          </FormLabel>
                          {localData.logo ? (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f7f7f7',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                                marginTop: '10px',
                              }}
                            >
                              <Link
                                href={`${OnRun}/${localData.logo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 'medium',
                                  color: '#ef5350',
                                  display: 'flex',
                                  alignItems: 'center',
                                  '&:hover': {
                                    color: '#d32f2f',
                                  },
                                }}
                              >
                                مشاهده فایل بارگذاری شده
                                <FileCopyOutlinedIcon
                                  sx={{ fontSize: '16px', marginLeft: '4px' }}
                                />
                              </Link>
                              <Button
                                onClick={() =>
                                  setLocalData({
                                    ...localData,
                                    logo: null,
                                  })
                                }
                              >
                                حذف فایل
                              </Button>
                            </Box>
                          ) : (
                            <Input
                              name="alignment_6columns_thisyear"
                              type="file"
                              id="file-upload-thisyear-financial_report"
                              sx={{
                                marginTop: '8px',
                                borderRadius: '8px',
                                width: '100%',
                                color: '#424242',
                                '&:focus': {
                                  outline: 'none',
                                  borderColor: '#3f51b5',
                                  boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                                },
                              }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const fileValue = file ? URL.createObjectURL(file) : '';
                                setLocalData({
                                  ...localData,
                                  logo: fileValue,
                                });
                              }}
                            />
                          )}
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </div>
            </Box>

            <div className="flex justify-center mt-8">
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="py-2 px-6 rounded-full shadow-lg"
                onClick={handleSubmit}
              >
                تایید
              </Button>
            </div>
            <p className="bg-red-700 z-50">
              تایپ های مجاز برای ارسال فایل :png ,jpg ,pdf ,rar ,jpeg ,docx ,xlsx ,csv ,xls , zip
            </p>
            {clicked && <p className="mt-4 text-center text-gray-600">{data.massage}</p>}
          </form>
        </Box>
      </Box>
    </div>
  ) : null;
};

FormCompanyInfo.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default FormCompanyInfo;
