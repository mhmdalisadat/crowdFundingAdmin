import React, { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { IoMdDoneAll } from 'react-icons/io';
import { GiEmptyHourglass } from 'react-icons/gi';
import CompanyFeatuet from './companyInfo/companyfeature';
import Managers from './managers/managers';
import ManagersDocument from './managersDocument/managersDocument';
import Shereholder from './shereholder/shereholder';
import Validation from './validation/validation';
import OtherCases from './otherCases/otherCases';
import History from './history/history';
import Contract from './contract/contract';
import useGetCardStatusEvaluation from '../useGetCardStatus';
import usePostCardStatusEvaluation from '../usePostCardStatus';

const EvaluationCommitteeDetails = () => {
  const [alignment, setAlignment] = useState(null);
  const [statusEvaluation, setStatusEvaluation] = useState(null);
  const { cartId } = useParams();
  const { data } = useGetCardStatusEvaluation(cartId);

  useEffect(() => {
    if (data && data.evaluation_committee !== undefined) {
      setStatusEvaluation(data.evaluation_committee);
    }
  }, [data]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const { mutate } = usePostCardStatusEvaluation(cartId);

  const handleApprove = () => {
    setStatusEvaluation(true);
    mutate(true, {
      onSuccess: (response) => {
        setStatusEvaluation(response.evaluation_committee);
      },
    });
  };

  const handleReview = () => {
    setStatusEvaluation(false);
    mutate(false, {
      onSuccess: (response) => {
        setStatusEvaluation(response.evaluation_committee);
      },
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: 4,
          padding: 2,
          borderRadius: 1,
          width: 'fit-content',
          backgroundColor: '#FEFEFE',
          boxShadow: 4,
        }}
      >
        <Typography sx={{ textAlign: 'center', p: 2 }}>انتخاب وضعیت</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleApprove}
            startIcon={<IoMdDoneAll />}
            sx={{
              width: '120px',
              backgroundColor: statusEvaluation === true ? '#58d68d' : '#abb2b9',
              '&:hover': {
                backgroundColor: statusEvaluation === true ? '#45b057' : '#abb2b9',
              },
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
          >
            تایید
          </Button>
          <Button
            variant="contained"
            onClick={handleReview}
            startIcon={<GiEmptyHourglass />}
            sx={{
              width: '120px',
              backgroundColor: statusEvaluation === false ? '#f4d03f' : '#abb2b9',
              color: statusEvaluation === false ? 'black' : '#fff',
              '&:hover': {
                backgroundColor: statusEvaluation === false ? '#e3c33a' : '#abb2b9',
              },
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
          >
            بررسی
          </Button>
        </Box>
      </Box>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        style={{ justifyContent: 'center', display: 'flex' }}
      >
        <ToggleButton value="companyInfo">اطلاعات شرکت</ToggleButton>
        <ToggleButton value="managers">مدیران</ToggleButton>
        <ToggleButton value="managersDocs">مستندات مدیران</ToggleButton>
        <ToggleButton value="shareholders">سهامداران</ToggleButton>
        <ToggleButton value="validation">اعتبار سنجی</ToggleButton>
        <ToggleButton value="otherInfo">سایر موارد</ToggleButton>
        <ToggleButton value="criminalRecords">سوء پیشینه</ToggleButton>
        <ToggleButton value="agencyContract">قرارداد عاملیت</ToggleButton>
      </ToggleButtonGroup>

      <div style={{ marginTop: '20px' }}>
        {alignment === 'companyInfo' && <CompanyFeatuet />}
        {alignment === 'managers' && <Managers />}
        {alignment === 'managersDocs' && <ManagersDocument />}
        {alignment === 'shareholders' && <Shereholder />}
        {alignment === 'validation' && <Validation />}
        {alignment === 'otherInfo' && <OtherCases />}
        {alignment === 'criminalRecords' && <History />}
        {alignment === 'agencyContract' && <Contract />}
      </div>
    </div>
  );
};

export default EvaluationCommitteeDetails;
