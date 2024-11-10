import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { fetchPlanInvestors } from '../service/detailplan/PlanInvestorsService';

const PlanInvestors = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['planDocument', id],
    queryFn: () => fetchPlanInvestors(id),
  });

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const columns = [
    {
      title: 'نام و نام خانوادگی',
      field: 'fullName',
      width: 500,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return firstName && lastName ? `${firstName.trim()} ${lastName.trim()}` : '';
      },
    },
    { title: 'مقدار سهم', field: 'amount', align: 'left', width: 455 },
    {
      title: 'مبلغ',
      field: 'total_amount',
      align: 'center',
      width: 300,
      formatter: (cell) => formatNumber(cell.getValue()),
    },
  ];

  return (
    <div>
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
        {data && data.length > 0 ? (
          <ReactTabulator data={data} columns={columns} layout="fitData" />
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
      </Box>
    </div>
  );
};

export default PlanInvestors;
