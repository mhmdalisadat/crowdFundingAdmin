import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { fetchCommit } from '../service/commentService';
import PlanCommentsModal from './planCommentModal';

const PlanComments = ({ idRow }) => {
  const [selectedComment, setSelectedComment] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['planCommit', idRow],
    queryFn: () => fetchCommit(idRow),
  });

  const handleRowClick = (e, row) => {
    setSelectedComment(row.getData());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: 'نام و نام خانوادگی',
      field: 'fullName',
      width: 250,
      formatter: (cell) => {
        const { firstName, lastName } = cell.getData();
        return firstName && lastName ? `${firstName} ${lastName}` : '';
      },
    },
    {
      title: 'متن نظر',
      field: 'comment',
      width: 540,
      formatter: (cell) => (cell.getValue() !== null ? cell.getValue() : ''),
    },
    {
      title: 'وضعیت',
      field: 'status',
      hozAlign: 'center',
      width: 220,
      formatter: 'tickCross',
    },
    {
      title: 'نمایش نام',
      field: 'known',
      hozAlign: 'center',
      width: 220,
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

        {data?.data && data.data.length > 0 ? (
          <ReactTabulator
            data={data.data}
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
        refetch={refetch}
      />
    </div>
  );
};

PlanComments.propTypes = {
  idRow: PropTypes.number.isRequired,
};

export default PlanComments;
