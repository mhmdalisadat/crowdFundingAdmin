import { useState, useEffect } from 'react';
import { Box, Typography, FormControl, FormLabel } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { useParams } from 'react-router-dom';
import { useGetOther } from 'src/module/Create_receiveRrequests/otherCases/service';

const OtherCases = () => {
  const { cartId } = useParams();

  // استفاده از هوک useGetOther برای دریافت داده‌ها
  const { data, isPending, isError } = useGetOther(cartId);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (data && !isPending && !isError) {
      // داده‌های دریافتی را در state ذخیره می‌کنیم
      setLocalData(data);
    }
  }, [data, isPending, isError]);

  if (!localData) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  const renderFileLink = (filePath, label) =>
    filePath ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          marginBottom: 2,
          gap: 2,
        }}
      >
        <Typography variant="body1" sx={{ flex: '1' }}>
          {label}
        </Typography>
        <a
          href={`${OnRun}${filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f7f7f7',
            padding: '8px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          مشاهده فایل
          <FileCopyOutlinedIcon sx={{ marginLeft: '4px' }} />
        </a>
      </Box>
    ) : (
      <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        فایلی برای {label} موجود نیست
      </Typography>
    );

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
        <Box display="flex" justifyContent="center" width="100%" mt={4}>
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: 3,
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '1200px',
            }}
          >
            <Box className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
              <Typography variant="h4" sx={{ color: 'black' }}>
                سایر موارد
              </Typography>
            </Box>

            <FormControl fullWidth>
              <FormLabel>تغییرات مدیران</FormLabel>
              {renderFileLink(localData.announcement_of_changes_managers, 'تغییرات مدیران')}

              <FormLabel>گردش حساب بانکی</FormLabel>
              {renderFileLink(localData.bank_account_turnover, 'گردش حساب بانکی')}

              <FormLabel>آخرین بیمه کارکنان</FormLabel>
              {renderFileLink(localData.latest_insurance_staf, 'آخرین بیمه کارکنان')}

              <FormLabel>وضعیت مطالبات</FormLabel>
              {renderFileLink(localData.claims_status, 'وضعیت مطالبات')}

              <FormLabel>کاتالوگ محصولات</FormLabel>
              {renderFileLink(localData.product_catalog, 'کاتالوگ محصولات')}

              <FormLabel>مجوزها</FormLabel>
              {renderFileLink(localData.licenses, 'مجوزها')}

              <FormLabel>تغییرات سرمایه</FormLabel>
              {renderFileLink(localData.announcement_of_changes_capital, 'تغییرات سرمایه')}

              <FormLabel>اساسنامه</FormLabel>
              {renderFileLink(localData.statutes, 'اساسنامه')}

              <FormLabel>دارایی‌ها و بدهی‌ها</FormLabel>
              {renderFileLink(localData.assets_and_liabilities, 'دارایی‌ها و بدهی‌ها')}

              <FormLabel>نماینده حسابرس</FormLabel>
              {renderFileLink(localData.auditor_representative, 'نماینده حسابرس')}

              <FormLabel>اعلام شماره حساب</FormLabel>
              {renderFileLink(localData.announcing_account_number, 'اعلام شماره حساب')}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OtherCases;
