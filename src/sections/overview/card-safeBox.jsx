import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { fShortenNumber } from 'src/utils/format-number';
import { ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const investmentData = [
  {
    title: 'طرح خوش بینانه',
    total: 5000,
    active: true,
    image: 'https://mahoure.com/wp-content/uploads/2023/12/investment-fund-02.jpg',
    description: 'این صندوق شامل سهام فناوری و نوآوری است.',
    startDate: '1402/01/01',
    endDate: '1403/01/01',
    status: 'فعال',
  },
  {
    title: 'طرح امیدوارکننده',
    total: 3000,
    active: false,
    image:
      'https://blog.mano.ir/wp-content/uploads/2020/04/%D8%B5%D9%86%D8%AF%D9%88%D9%82-01-scaled-1.jpg',
    description: 'این صندوق بر روی سهام پایدار و کم‌ریسک متمرکز است.',
    startDate: '1401/01/01',
    endDate: '1402/01/01',
    status: 'غیرفعال',
  },
  {
    title: 'طرح آینده روشن',
    total: 7000,
    active: true,
    image: 'https://learning.emofid.com/wp-content/uploads/2020/04/mutual.jpg',
    description: 'این صندوق سرمایه‌گذاری در بازارهای نوظهور را هدف قرار داده است.',
    startDate: '1402/02/01',
    endDate: '1403/02/01',
    status: 'فعال',
  },
];

const InactiveRibbon = styled(Box)(() => ({
  position: 'absolute',
  right: '-140px',
  top: '-70px',
  backgroundColor: 'rgba(128, 128, 128, 0.7)',
  color: 'white',
  padding: '10px 100px',
  borderRadius: '5px',
  fontWeight: 'bold',
  transform: 'rotate(-45deg)',
  transformOrigin: 'top left',
  zIndex: 1,
}));

export default function CardSafeBox({ color = 'primary', sx, ...other }) {
  return (
    <Stack
      direction="row"
      spacing={5}
      justifyContent="center"
      sx={{ mt: 8, mx: 'auto', maxWidth: '1000px', width: '100%' }}
    >
      {investmentData.map((investment, index) => (
        <Card
          key={index}
          sx={{
            p: 3,
            borderRadius: 3,
            width: '800px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: investment.active ? '#e0f7fa' : '#f0f0f0',
            boxShadow: investment.active ? 6 : 2,
            transition: '0.3s',
            position: 'relative',
            ...(investment.active
              ? {
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'scale(1.02)',
                    backgroundColor: '#b2ebf2',
                  },
                }
              : {
                  pointerEvents: 'none',
                }),
            ...sx,
          }}
          {...other}
        >
          {!investment.active && <InactiveRibbon>اتمام طرح</InactiveRibbon>}

          <Box
            sx={{
              width: '100%',
              height: '150px',
              backgroundImage: `url(${investment.image})`,
              backgroundSize: 'cover',
              borderRadius: 0,
              marginBottom: 2,
              border: '2px solid white',
              boxShadow: 1,
            }}
          />

          <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: investment.active ? 'black' : 'gray' }}
            >
              {fShortenNumber(investment.total)}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: '18px',
                color: investment.active ? 'black' : 'gray',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {investment.title}
              <ArrowForward sx={{ ml: 1 }} />
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '14px', color: investment.active ? 'black' : 'gray' }}
            >
              {investment.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '12px', color: investment.active ? 'black' : 'gray' }}
            >
              شروع طرح: {investment.startDate}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '12px', color: investment.active ? 'black' : 'gray' }}
            >
              پایان طرح: {investment.endDate}
            </Typography>
            <Chip
              label={investment.status}
              variant="outlined"
              sx={{ marginTop: 1, borderColor: investment.active ? 'black' : 'gray' }}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}

CardSafeBox.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};
