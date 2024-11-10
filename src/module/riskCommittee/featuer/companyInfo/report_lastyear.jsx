import { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Typography } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import UseCartId from 'src/hooks/card_id';
import useGetCards from 'src/module/Create_receiveRrequests/cart/service/useGetCarts';

const ReportLastYear = () => {
  const { cartId } = UseCartId();
  const { data } = useGetCards(cartId);

  const [localData, setLocalData] = useState({
    financial_report_lastyear: null,
    audit_report_lastyear: null,
    statement_lastyear: null,
  });

  useEffect(() => {
    if (data && data.cart && data.cart.length > 0) {
      const selectedCart = data.cart[0];
      setLocalData({
        financial_report_lastyear: selectedCart.financial_report_lastyear,
        audit_report_lastyear: selectedCart.audit_report_lastyear,
        statement_lastyear: selectedCart.statement_lastyear,
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
        گزارشات و مستندات منتهی به سال 1402
      </Typography>

      <FormControl fullWidth>
        <FormLabel>صورت مالی</FormLabel>
        {localData.financial_report_lastyear ? (
          <Box>
            <a
              href={`${OnRun}/${localData.financial_report_lastyear}`}
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
              <FileCopyOutlinedIcon />
            </a>
          </Box>
        ) : (
          <Input
            type="file"
            disabled
            onChange={(e) => {
              const file = e.target.files[0];
              setLocalData({ ...localData, financial_report_lastyear: file });
            }}
          />
        )}
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>گزارش حسابرسی</FormLabel>
        {localData.audit_report_lastyear ? (
          <Box>
            <a
              href={`${OnRun}/${localData.audit_report_lastyear}`}
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
              <FileCopyOutlinedIcon />
            </a>
          </Box>
        ) : (
          <Input
            type="file"
            disabled
            onChange={(e) => {
              const file = e.target.files[0];
              setLocalData({ ...localData, audit_report_lastyear: file });
            }}
          />
        )}
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>صورت مالی</FormLabel>
        {localData.financial_report_lastyear ? (
          <Box>
            <a
              href={`${OnRun}/${localData.financial_report_lastyear}`}
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
              setLocalData({ ...localData, financial_report_lastyear: file });
            }}
          />
        )}
      </FormControl>
    </Box>
  );
};

export default ReportLastYear;
