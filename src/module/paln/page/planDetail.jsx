import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlanDetailTab from '../feature/plandetailTab';
import useGetPlanDetail from '../service/plandetail/useGetPlandetail';

const PlanDetailPage = () => {
  const [idRow, setIdRow] = useState();
  const { trace_code } = useParams();
  
  const { data , refetch } = useGetPlanDetail(trace_code)

  useEffect(() => {
    setIdRow(trace_code);
  }, [trace_code]);



  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginTop: '40px',
        }}
      >
        <PlanDetailTab planData={data} refetch={refetch} idRow={idRow} />
      </Box>
    </div>
  );
};

export default PlanDetailPage;
