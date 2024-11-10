import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetPlanDetail from '../../service/plandetail/useGetPlandetail';

const BoardMember = () => {
  const { trace_code } = useParams();
  const { data } = useGetPlanDetail(trace_code);

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>نام خانوادگی</TableCell>
            <TableCell>سمت</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.board_member?.length > 0 ? (
            data.board_member.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.first_name || 'ناموجود'}</TableCell>
                <TableCell>{member.last_name || 'ناموجود'}</TableCell>
                <TableCell>{member.organization_post_description || 'ناموجود'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                عضو هیئت‌مدیره‌ای یافت نشد!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardMember;
