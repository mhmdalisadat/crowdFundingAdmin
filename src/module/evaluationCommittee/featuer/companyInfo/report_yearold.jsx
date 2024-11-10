import { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Typography } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import UseCartId from 'src/hooks/card_id';
import useGetCards from 'src/module/Create_receiveRrequests/cart/service/useGetCarts';

const ReportYaerOld = () => {
  const { cartId } = UseCartId();
  const { data } = useGetCards(cartId);
  const [localData, setLocalData] = useState({
    Lock_financial_report_yearold: false,
    financial_report_yearold: null,
    Lock_audit_report_yearold: false,
    audit_report_yearold: null,
    Lock_statement_yearold: false,
    statement_yearold: null,
  });

  useEffect(() => {
    if (data && data.cart && data.cart.length > 0) {
      const selectedCart = data.cart[0]; 
      setLocalData({
        Lock_financial_report_yearold: selectedCart.Lock_financial_report_yearold ?? false,
        financial_report_yearold: selectedCart.financial_report_yearold ?? null,
        Lock_audit_report_yearold: selectedCart.Lock_audit_report_yearold ?? false,
        audit_report_yearold: selectedCart.audit_report_yearold ?? null,
        Lock_statement_yearold: selectedCart.Lock_statement_yearold ?? false,
        statement_yearold: selectedCart.statement_yearold ?? null,
      });
    }
  }, [data]);

  return (
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

      <FormControl fullWidth>
        <FormLabel>صورت مالی</FormLabel>
        {localData.financial_report_yearold ? (
          <Box>
            <a
              href={`${OnRun}/${localData.financial_report_yearold}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
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
              مشاهده فایل بارگذاری شده
              <FileCopyOutlinedIcon sx={{ marginLeft: '8px' }} />
            </a>
          </Box>
        ) : (
          <Input
            type="file"
            disabled
            onChange={(e) => {
              const file = e.target.files[0];
              setLocalData({ ...localData, financial_report_yearold: file });
            }}
          />
        )}
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>گزارش حسابرسی</FormLabel>
        {localData.audit_report_yearold ? (
          <Box>
            <a
              href={`${OnRun}/${localData.audit_report_yearold}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
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
              مشاهده فایل بارگذاری شده
              <FileCopyOutlinedIcon sx={{ marginLeft: '8px' }} />
            </a>
          </Box>
        ) : (
          <Input
            type="file"
            disabled
            onChange={(e) => {
              const file = e.target.files[0];
              setLocalData({ ...localData, audit_report_yearold: file });
            }}
          />
        )}
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>اظهارنامه مالیات بر عملکرد</FormLabel>
        {localData.statement_yearold ? (
          <Box>
            <a
              href={`${OnRun}/${localData.statement_yearold}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
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
              مشاهده فایل بارگذاری شده
              <FileCopyOutlinedIcon sx={{ marginLeft: '8px' }} />
            </a>
          </Box>
        ) : (
          <Input
            type="file"
            disabled
            onChange={(e) => {
              const file = e.target.files[0];
              setLocalData({ ...localData, statement_yearold: file });
            }}
          />
        )}
      </FormControl>
    </Box>
  );
};

export default ReportYaerOld;
