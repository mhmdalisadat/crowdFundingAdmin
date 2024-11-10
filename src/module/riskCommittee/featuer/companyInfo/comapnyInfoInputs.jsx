/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import useGetCards from 'src/module/Create_receiveRrequests/cart/service/useGetCarts';
import UseCartId from 'src/hooks/card_id';
import { Box, Typography } from '@mui/material';
import { formatNumber } from 'src/utils/formatNumbers';

const RiskCompanyInput = () => {
  const { cartId } = UseCartId();
  const { data } = useGetCards(cartId);

  const getCompanyKind = (value) => {
    switch (value) {
      case '1':
        return 'شرکت سهامی سجام';
      case '2':
        return 'شرکت با مسئولیت محدود';
      case '3':
        return 'شرکت تضامنی';
      case '4':
        return 'شرکت مختلط(سهامی و غیر سهامی)';
      case '5':
        return 'شرکت نسبی';
      case '6':
        return 'شرکت تعاونی';
      case '7':
        return 'شرکت دانش بنیان';
      case '8':
        return 'سهامی خاص';
      default:
        return 'انتخاب نشده';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {data?.cart &&
          data.cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                marginBottom: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography variant="body2">نام شرکت: {item.company_name}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>نوع شرکت: {getCompanyKind(item.company_kind)}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>شماره شناسه: {item.nationalid}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>شماره ثبت: {item.registration_number}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>سریال ثبتی (ریال): {formatNumber(item.registered_capital)}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>
                  تعداد سهام: {formatNumber(item.amount_of_registered_shares ?? 0)}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>شماره روزنامه رسمی آخرین مدیران: {item.newspaper}</Typography>
              </Box>
              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>
                  تاریخ روزنامه رسمی آخرین مدیران:{' '}
                  {item.date_newspaper
                    ? new Date(item.date_newspaper).toLocaleDateString('fa-IR')
                    : 'ندارد'}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>تعداد کارکنان : {item.personnel}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>شهر محل ثبت: {item.city}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>آدرس محل ثبت: {item.address}</Typography>
              </Box>
              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>
                  تاریخ تاسیس:
                  {item.year_of_establishment
                    ? new Date(item.year_of_establishment).toLocaleDateString('fa-IR')
                    : 'ندارد'}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>کد بورسی: {item.exchange_code}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>کد پستی: {item.postal_code}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>ایمیل شرکت: {item.email}</Typography>
              </Box>

              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Typography>موضوع فعالیت شرکت: {item.activity_industry}</Typography>
              </Box>
              <Box
                sx={{
                  flex: '1 1 23%',
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                }}
              >
                <Box display="flex" alignItems="center" mb={2} justifyContent="center">
                  <label
                    className="block text-gray-700 text-sm font-medium"
                    style={{ textAlign: 'center' }}
                  >
                    میزان منابع درخواستی (ریال):
                  </label>
                </Box>
                <input
                  disabled
                  type="range"
                  name="amount_of_request"
                  min={10000000000}
                  max={250000000000}
                  step={10000000000}
                  value={item.amount_of_request}
                  className="w-full"
                />
                <span className="block text-gray-700 text-sm mt-4 text-center">
                  {formatNumber(item.amount_of_request)} ریال
                </span>
              </Box>
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default RiskCompanyInput;
