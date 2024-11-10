import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Switch,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { SubmitButton } from 'src/components/button';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';
import { useGetAddInfo } from '../../service/planPicture/addInfo/useGetAddInfo';
import { usePostInfo } from '../../service/planPicture/addInfo/usePostAddInfo';

const AddInfo = () => {
  const { trace_code } = useParams();
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [statusShow, setStatusShow] = useState(false);
  const [satusSecond, setSatusSecond] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const storedDate = localStorage.getItem(`selectedDate_${trace_code}`);
    if (storedDate) {
      const date = new Date(storedDate);
      setSelectedDate(date.getTime());
    }
  }, [trace_code]);

  const { data, refetch } = useGetAddInfo(trace_code);
  const { mutate, isPending, isError } = usePostInfo(trace_code);

  useEffect(() => {
    if (data) {
      const paymentDate = data.payment_date ? new DateObject(data.payment_date) : null;
      let timestamp = null;

      if (paymentDate && paymentDate.isValid) {
        paymentDate.set('hour', 0);
        paymentDate.set('minute', 0);
        paymentDate.set('second', 0);
        timestamp = Math.floor(paymentDate.toDate().getTime());
        setSelectedDate(timestamp);
      }

      setRateOfReturn(data.rate_of_return || '');
      setStatusShow(data.status_show || false);
      setSatusSecond(data.status_second || '');

      if (timestamp !== null) {
        localStorage.setItem(`selectedDate_${trace_code}`, timestamp);
      }
    }
  }, [data, trace_code]);

  const handleInputChange = (event) => {
    setRateOfReturn(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setStatusShow(event.target.checked);
  };

  const handleSelectChange = (event) => {
    setSatusSecond(event.target.value);
  };
const handleDateChange = (date) => {
  if (date) {
    const localDate = new DateObject({
      year: date.year,
      month: date.month.index + 1,
      day: date.day,
      calendar: persian,
      locale: persian_fa,
    });

    const dateAtMidnight = new Date(localDate.toDate().setHours(0, 0, 0, 0)).getTime();

    setSelectedDate(dateAtMidnight);
    localStorage.setItem(`selectedDate_${trace_code}`, dateAtMidnight);
  }
};

  
  

  const handleSubmit = () => {
    if (!rateOfReturn) {
      toast.error('لطفاً نرخ بازدهی را وارد کنید!');
      return;
    }
    if (!satusSecond) {
      toast.error('لطفاً وضعیت طرح را انتخاب کنید!');
      return;
    }
    if (!selectedDate) {
      toast.error('لطفاً تاریخ پایان را انتخاب کنید!');
      return;
    }
  
    mutate(
      {
        rate_of_return: rateOfReturn,
        status_show: statusShow,
        status_second: satusSecond,
        payment_date: selectedDate, 
      },
      {
        onSuccess: () => {
          toast.success('اطلاعات با موفقیت ثبت شد!');
          refetch();
        },
        onError: () => {
          toast.error('خطا در ثبت اطلاعات!');
        },
      }
    );
  };
  

  return (
    <>
      <ToastContainer />
      <Box className="bg-gray-100 text-center py-4 rounded-t-lg m">
        <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
          افزودن اطلاعات تکمیلی
        </Typography>
      </Box>
      <Box sx={{ padding: '24px' }}>
        <Box sx={{ p: 6, boxShadow: 4, borderRadius: 2, mb: 2 }}>
          <TextField
            type="number"
            fullWidth
            label="نرخ بازدهی"
            variant="outlined"
            value={rateOfReturn}
            onChange={handleInputChange}
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray',
                },
              },
              marginBottom: '16px',
            }}
          />

          <FormControl component="fieldset" variant="standard" sx={{ marginBottom: '24px' }}>
            <FormLabel component="legend" sx={{ marginBottom: '8px' }}>
              انتشار طرح
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={statusShow} onChange={handleSwitchChange} />}
                label="انتشار و عدم انتشار"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#555',
                  },
                }}
              />
            </FormGroup>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ marginBottom: '16px' }}>
            <Select value={satusSecond} onChange={handleSelectChange} displayEmpty>
              <MenuItem value="">
                <em>وضعیت طرح را انتخاب کنید</em>
              </MenuItem>
              <MenuItem value="1">شروع شده</MenuItem>
              <MenuItem value="2">جمع آوری</MenuItem>
              <MenuItem value="3">تمدید شده</MenuItem>
              <MenuItem value="5">تکمیل شده</MenuItem>
              <MenuItem value="4">سررسید ناموفق</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            width: '100%',
            p: 6,
            backgroundColor: '#ffffff',
            boxShadow: 4,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Box className="bg-gray-100 text-center py-4 rounded-t-lg">
              <Typography variant="h5" component="h1" className="text-gray-700 font-bold">
                پایان جمع‌آوری وجه
              </Typography>
            </Box>

            <Grid item xs={12} sm={6} md={6} mt={5}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                تاریخ پایان:
              </Typography>
              <DatePicker
                format="YYYY/MM/DD"
                calendar={persian}
                locale={persian_fa}
                value={selectedDate ? new DateObject(selectedDate) : null}
                onChange={handleDateChange}
                style={{
                  minWidth: '30em',
                  height: '55px',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Grid>
          </div>
        </Box>

        <Box mt={2}>
          <SubmitButton onClick={handleSubmit} disabled={isPending} fullWidth />
        </Box>
        {isError && (
          <Typography color="error" sx={{ marginTop: '16px', textAlign: 'center' }}>
            خطا در ارسال اطلاعات
          </Typography>
        )}
      </Box>
    </>
  );
};

export default AddInfo;
