/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { SubmitButton } from 'src/components/button';
import useGetEndOfFundraising from 'src/module/paln/service/endoffundraising/useGetEndOfFundraising';
import { useParams } from 'react-router-dom';
import DateObject from 'react-date-object';
import usePostEndOfFundraising from 'src/module/paln/service/endoffundraising/usePostpostEndOfFundraising';
import { cleanNumber } from 'src/utils/formatNumbers';
import { toast, ToastContainer } from 'react-toastify';

const EndOffUndraisingPage = () => {
  const { trace_code } = useParams();
  const { data } = useGetEndOfFundraising(trace_code);
  const { mutate } = usePostEndOfFundraising(trace_code);

  const [formData, setFormData] = useState([]);
  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setFormData(data);
    } else {
      setFormData([]);
    }
  }, [data]);

  const handleTypeChange = (index, value) => {
    const updatedData = [...formData];
    updatedData[index].type = value;
    setFormData(updatedData);
  };

  const handleDateChange = (index, field, value) => {
    const updatedData = [...formData];
    updatedData[index][field] = value ? value.toDate() : null;
    setFormData(updatedData);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  };
  
  const handleSubmit = () => {
    const updatedData = formData.map((item) => ({
      amount_operator: parseFloat(item.amount_operator) || 0,
      amount_systemic: item.amount_systemic || 0,
      date_capitalization_operator: item.date_capitalization_operator
        ? formatDate(new Date(item.date_capitalization_operator))
        : null,
      date_capitalization_systemic: item.date_capitalization_systemic
        ? formatDate(new Date(item.date_capitalization_systemic))
        : null,
      date_operator: item.date_operator ? formatDate(new Date(item.date_operator)) : null,
      date_systemic: item.date_systemic ? formatDate(new Date(item.date_systemic)) : null,
      id: item.id,
      plan: item.plan,
      type: item.type || '2',
    }));
  
    mutate(
      { updatedData },
      {
        onSuccess: () => {
          toast.success('اطلاعات با موفقیت ارسال شد');
        },
        onError: () => {
          toast.error('خطا در ارسال اطلاعات');
        },
      }
    );
  };
  

  return (
    <div className="items-center p-4">
      <ToastContainer />

      <Box
        sx={{
          p: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box className="bg-gray-100 text-center py-4 rounded-t-lg mb-10 ">
          <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
            پایان جمع آوری وجه
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {Array.isArray(formData) &&
            formData.map((item, index) => (
              <Grid container spacing={3} key={index}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        backgroundColor: '#fafafa',
                        boxShadow: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: 0.9,
                        cursor: 'not-allowed',
                      }}
                    >
                      <Box className="bg-gray-100 text-center py-4 rounded-t-lg mb-8">
                        <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
                          سیستمی
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            مبلغ :
                          </Typography>
                          <Box
                            sx={{
                              p: 2.2,
                              borderRadius: '8px',
                              backgroundColor: '#ececec',
                              color: '#333',
                              boxShadow: 4,
                            }}
                          >
                            {formatNumber(item.amount_systemic)}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            نوع :
                          </Typography>
                          <Box
                            sx={{
                              p: 2.2,
                              borderRadius: '8px',
                              backgroundColor: '#ececec',
                              color: '#333',
                              boxShadow: 4,
                            }}
                          >
                            {item.type === '2' ? 'سود' : item.type === '1' ? 'اصل' : 'نوع نامشخص'}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            تاریخ چک:
                          </Typography>
                          <Box
                            sx={{
                              p: 2.2,
                              borderRadius: '8px',
                              backgroundColor: '#ececec',
                              color: '#333',
                              boxShadow: 4,
                            }}
                          >
                            {item.date_capitalization_systemic &&
                              new DateObject(item.date_capitalization_systemic)
                                .convert(persian)
                                .toString('YYYY/MM/DD')}
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            تاریخ سود:
                          </Typography>
                          <Box
                            sx={{
                              p: 2.2,
                              borderRadius: '8px',
                              backgroundColor: '#ececec',
                              color: '#333',
                              boxShadow: 4,
                            }}
                          >
                            {item.date_systemic &&
                              new DateObject(item.date_systemic)
                                .convert(persian)
                                .toString('YYYY/MM/DD')}
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mt: 3 }}>
                    <Paper
                      elevation={3}
                      sx={{ p: 3, mb: 3, borderRadius: '12px', backgroundColor: 'grey.200' }}
                    >
                      <Box className="bg-gray-200 text-center py-4 rounded-t-lg mb-8">
                        <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
                          دستی
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            مبلغ :
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={formatNumber(item.amount_operator)}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const validInput = inputValue.replace(/[^0-9,]/g, '');
                              const cleanedValue = cleanNumber(validInput);

                              const updatedFormData = [...formData];
                              updatedFormData[index] = {
                                ...updatedFormData[index],
                                amount_operator: cleanedValue,
                              };

                              setFormData(updatedFormData);
                            }}
                            sx={{
                              borderRadius: '8px',
                              backgroundColor: '#ffffff',
                              color: '#333',
                              boxShadow: 4,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            نوع :
                          </Typography>
                          <FormControl
                            fullWidth
                            variant="outlined"
                            sx={{ borderRadius: '8px', backgroundColor: '#ffffff' }}
                          >
                            <InputLabel>نوع</InputLabel>
                            <Select
                              value={item.type || ''}
                              onChange={(e) => handleTypeChange(index, e.target.value)}
                              label="نوع"
                            >
                              <MenuItem value="1">اصل</MenuItem>
                              <MenuItem value="2">سود</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            تاریخ چک:
                          </Typography>
                          <DatePicker
                            format="YYYY/MM/DD"
                            calendar={persian}
                            locale={persian_fa}
                            value={
                              item.date_capitalization_operator &&
                              new DateObject(item.date_capitalization_operator)
                                .convert(persian)
                                .toString('YYYY/MM/DD')
                            }
                            onChange={(date) =>
                              handleDateChange(index, 'date_capitalization_operator', date)
                            }
                            style={{
                              minWidth: '17.5em',
                              height: '55px',
                              padding: '15px',
                              borderRadius: '8px',
                              borderColor: '#fff',
                              backgroundColor: '#ffffff',
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            تاریخ سود:
                          </Typography>
                          <DatePicker
                            format="YYYY/MM/DD"
                            calendar={persian}
                            locale={persian_fa}
                            value={
                              item.date_operator &&
                              new DateObject(item.date_operator)
                                .convert(persian)
                                .toString('YYYY/MM/DD')
                            }
                            onChange={(date) => handleDateChange(index, 'date_operator', date)}
                            style={{
                              minWidth: '17.5em',
                              height: '55px',
                              padding: '15px',
                              borderRadius: '8px',
                              borderColor: '#fff',
                              backgroundColor: '#ffffff',
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            ))}
        </Grid>

        <SubmitButton onClick={handleSubmit} sx={{ mt: 3 }} />
      </Box>
    </div>
  );
};

export default EndOffUndraisingPage;
