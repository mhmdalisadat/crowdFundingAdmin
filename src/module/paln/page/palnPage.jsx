import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchPlan } from '../service/planService';
import PlanTableFeature from '../feature/plantablefeature';

const PlanPage = () => {
  const [planData, setPlanData] = useState([]);

  const { data,refetch } = useQuery({
    queryKey: ['plan'],
    queryFn: () => fetchPlan(),
  });

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      setPlanData(data.data);
    } else {
      setPlanData([]);
    }
  }, [data]);
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
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700"> طرح</h1>
        </div>

        <PlanTableFeature planData={planData} refetch={refetch} setPlanData={setPlanData}/>
      </Box>
    </div>
  );
};

export default PlanPage;
