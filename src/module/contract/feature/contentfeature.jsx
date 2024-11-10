/* eslint-disable arrow-body-style */
import React from 'react';
import { Grid } from '@mui/material';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import UseCartId from 'src/hooks/card_id';
import { toast } from 'react-toastify'; 
import ContentInput from './contractInput';
import SwitchContract from './switchInputs';
import UsePostContract from '../services/usePostContract';

const ContractFeature = ({ setContractData, contractData }) => {
  const { cartId } = UseCartId();
  const { mutate } = UsePostContract(cartId);

  const postContractData = () => {
    mutate(contractData, {
      onSuccess: () => {
        toast.success('اطلاعات قرارداد با موفقیت ارسال شد');
      },
      onError: () => {
        toast.error('خطا در ارسال اطلاعات قرارداد');
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ContentInput contractData={contractData} setContractData={setContractData} />
      </Grid>
      <Grid item xs={12}>
        <SwitchContract contractData={contractData} setContractData={setContractData} />
      </Grid>
      <Grid item xs={12}>
        <SubmitButton
          contractData={contractData}
          onClick={postContractData}
          postContractData={postContractData}
        />
      </Grid>
    </Grid>
  );
};

ContractFeature.propTypes = {
  contractData: PropTypes.object,
  setContractData: PropTypes.func,
};

export default ContractFeature;
