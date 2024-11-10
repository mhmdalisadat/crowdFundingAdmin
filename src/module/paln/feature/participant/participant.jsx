/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Backdrop,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import moment from 'moment-jalaali';
import useGetParticipant from '../../service/participant/useGetParticipant';
import usePostParticipant from '../../service/participant/usePostParticipant';
import useGetReciept from '../../service/participant/useGetReciept';

const PlanInvestors = () => {
  const { trace_code } = useParams();
  const { data, isPending, refetch } = useGetParticipant(trace_code);

  const { mutate } = usePostParticipant(trace_code);
  const [status, setStatus] = useState('0');

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [statusSwitch, setStatusSwitch] = useState(false);
  const [localData, setLocalData] = useState([]);
  const { data: respiet } = useGetReciept(selectedRow?.id);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleStatusClick = (row) => {
    setSelectedRow(row);
    setStatus(row.status);
    setStatusSwitch(row.status);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (selectedRow) {
      const updatedRow = { ...selectedRow, status: statusSwitch };

      const updatedData = localData.map((row) => (row.id === updatedRow.id ? updatedRow : row));

      setLocalData(updatedData);

      mutate(
        {
          status: statusSwitch,
          id: updatedRow.id,
        },
        {
          onSuccess: () => refetch(),
          onError: (error) => console.error('خطا در به‌روزرسانی وضعیت:', error),
        }
      );
    }
    setOpenDialog(false);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setStatusSwitch(newStatus);
  };

  const columns = [
    { title: 'نام و نام خانوادگی', field: 'fulname', width: 200 },
    { title: 'مقدار سهم', field: 'amount', hozAlign: 'left', width: 150 },
    {
      title: 'مبلغ',
      field: 'value',
      hozAlign: 'center',
      width: 100,
      formatter: (cell) => formatNumber(cell.getValue()),
    },
    {
      title: 'تاریخ ایجاد',
      field: 'create_date',
      hozAlign: 'center',
      width: 200,
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? moment(value).format('jYYYY/jMM/jDD') : 'تاریخ مشخص نشده';
      },
    },
    {
      title: 'وضعیت نام',
      field: 'name_status',
      hozAlign: 'center',
      width: 150,
      formatter: (row) => (row.getData().name_status ? 'فعال' : 'غیر فعال'),
    },

    {
      title: 'وضعیت',
      field: 'status',
      hozAlign: 'center',
      width: 150,
      formatter: (row) => {
        const { status } = row.getData();
        switch (status) {
          case '0':
            return 'رد شده';
          case '1':
            return 'در حال بررسی';
          case '2':
            return 'تایید موقت';
          case '3':
            return 'تایید نهایی';
          default:
            return 'نامشخص';
        }
      },
      cellClick: (e, cell) => handleStatusClick(cell.getData()),
    },

    { title: 'کاربر', field: 'user', hozAlign: 'center', width: 350 },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  

  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            borderRadius: '16px 16px 0 0',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            سرمایه گذاران
          </Typography>
        </Box>

        {isPending ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : localData && localData.length > 0 ? (
          <ReactTabulator data={localData} columns={columns} layout="fitData" />
        ) : (
          <Box
            sx={{
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              اطلاعاتی جهت نمایش وجود ندارد !
            </Typography>
          </Box>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent sx={{ p: 4, minWidth: '600px' }}>
            <FormControl fullWidth>
              <InputLabel>وضعیت</InputLabel>
              <Select value={status} onChange={handleStatusChange} label="وضعیت">
                <MenuItem value="0">رد شده</MenuItem>
                <MenuItem value="1">در حال بررسی</MenuItem>
                <MenuItem value="2">تایید موقت</MenuItem>
                <MenuItem value="3">تایید نهایی</MenuItem>
              </Select>
            </FormControl>

            {respiet && Array.isArray(respiet) && respiet.length > 0 ? (
              respiet.map((item, index) => (
                <Table key={index}>
                  <TableBody>
                    <TableRow>
                      <TableCell>نوع پرداخت</TableCell>
                      <TableCell>{item.document ? 'درگاه' : 'فیش'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>مقدار</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>شناسه پرداخت</TableCell>
                      <TableCell>{item.payment_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>مبلغ</TableCell>
                      <TableCell>{formatNumber(item.value)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))
            ) : (
              <p>هیچ داده‌ای برای نمایش وجود ندارد.</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">
              تایید
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              لغو
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default PlanInvestors;
