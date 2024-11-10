import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import PlanCommentsModal from './planCommentModal';
import useGetComment from '../../service/comment/useGetComment';

const PlanComments = () => {
  const { trace_code } = useParams();
  const [selectedComment, setSelectedComment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { data, isPending } = useGetComment(trace_code);

  const handleRowClick = (e, row) => {
    if (row && row.getData) {
      setSelectedComment(row.getData());
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
  };

  if (isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    {
      title: 'نام و نام خانوادگی',
      field: 'fullName',
      width: 250,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return `${firstName || ''} ${lastName || ''}`.trim();
      },
    },
    {
      title: 'متن نظر',
      field: 'comment',
      width: 440,
      formatter: (cell) => sanitizeInput(cell.getValue() || ''),
    },

    {
      title: 'پاسخ',
      field: 'answer',
      width: 440,
      formatter: (cell) => sanitizeInput(cell.getValue() || ''),
    },

    {
      title: 'وضعیت',
      field: 'status',
      hozAlign: 'center',
      width: 120,
      formatter: 'tickCross',
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
            نظرات
          </Typography>
        </Box>

        {data && Array.isArray(data) && data.length > 0 ? (
          <ReactTabulator
            data={data}
            columns={columns}
            layout="fitData"
            events={{
              rowClick: handleRowClick,
            }}
          />
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
      <PlanCommentsModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        id={2}
      />
    </div>
  );
};

export default PlanComments;
