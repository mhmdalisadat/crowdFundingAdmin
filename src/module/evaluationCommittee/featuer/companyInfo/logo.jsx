import { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Typography } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import UseCartId from 'src/hooks/card_id';
import useGetCards from 'src/module/Create_receiveRrequests/cart/service/useGetCarts';

const Logo = () => {
  const { cartId } = UseCartId();
  const { data } = useGetCards(cartId);

  const [localData, setLocalData] = useState({
    Lock_logo: false,
    logo: null,
  });

  useEffect(() => {
    if (data && data.cart && data.cart.length > 0) {
      const selectedCart = data.cart[0];
      setLocalData({
        Lock_logo: selectedCart.Lock_logo ?? false,
        logo: selectedCart.logo ?? null,
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
        لوگو شرکت
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel sx={{ color: '#424242', fontSize: '14px', fontWeight: 'medium' }}>
          فایل لوگو
        </FormLabel>
        {localData.logo ? (
          <Box>
            <a
              href={`${OnRun}/${localData.logo}`}
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
              setLocalData({ ...localData, logo: file });
            }}
          />
        )}
      </FormControl>
    </Box>
  );
};

export default Logo;
