import UseCartId from 'src/hooks/card_id';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';
import CompanyFeatuet from '../feature/companyfeature';
import { fetchCompany } from '../service/compantInfoService';

const CompanyInfoPage = () => {
  const { cartId } = UseCartId();

  const { data, isSuccess } = useQuery({
    queryKey: ['cartDetail', cartId],
    queryFn: () => fetchCompany(cartId),
  });

  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {
    if (isSuccess && data && data.data) {
      setLocalData(data.data.cart);
    }
  }, [isSuccess, data]);
  

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setLocalData({
      ...localData,
      amount_of_request: value,
    });
  };

   const handleFileRemove = (type ) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  

  return (
    <form>
      {isSuccess ? (
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
              <CompanyFeatuet
                localData={localData}
                setLocalData={setLocalData}
                handleRangeChange={handleRangeChange}
                handleFileRemove={handleFileRemove}
              />
            </Box>
          </Box>
        </div>
      ) : (
        <p>در حال بارگزاری...</p>
      )}
    </form>
  );
};

export default CompanyInfoPage;
