import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetPlanDetail from '../../service/plandetail/useGetPlandetail';

const ShereHolder = () => {
  const { trace_code } = useParams();
  const { data, isLoading, error } = useGetPlanDetail(trace_code);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات!</p>;

  return (
    <Box sx={{ p: 3 }}>
      {data?.shareholder?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>نوع سهام‌دار</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>نام خانوادگی</TableCell>
                <TableCell>درصد سهام</TableCell>
                <TableCell>کد طرح</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.shareholder.map((shareholder, index) => (
                <TableRow key={index}>
                  <TableCell>{shareholder.shareholder_type === 1 ? 'حقیقی' : 'حقوقی'}</TableCell>
                  <TableCell>{shareholder.first_name || 'اطلاعات موجود نیست'}</TableCell>
                  <TableCell>{shareholder.last_name || 'اطلاعات موجود نیست'}</TableCell>
                  <TableCell>{`${shareholder.share_percent}%` || 'اطلاعات موجود نیست'}</TableCell>
                  <TableCell>{shareholder.plan || 'اطلاعات موجود نیست'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center">
          سهام‌داری یافت نشد!
        </Typography>
      )}
    </Box>
  );
};

export default ShereHolder;
