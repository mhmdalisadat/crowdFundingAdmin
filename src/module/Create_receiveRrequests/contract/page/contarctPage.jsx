import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import UseCartId from 'src/hooks/card_id';
import ContractFeature from '../feature/contentfeature';
import useGetContract from '../services/useGetContract';

const ContractPage = () => {
  const [contractData, setContractData] = useState({});
  const { cartId } = UseCartId();
  const { data: dataContract, isError } = useGetContract(cartId);
  
  const handelClick = () => {
  };

  useEffect(() => {
    if (dataContract && !isError) {
      const contractInfo = Array.isArray(dataContract) ? dataContract[0] : dataContract;
      setContractData(contractInfo);
    } else if (isError) {
      toast.error(`Error fetching contract data: ${isError.message || 'Unknown error'}`);
    }
  }, [dataContract, isError]);

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
          maxWidth: '900px',
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
          <h1 className="text-2xl font-bold text-gray-700">قرارداد عاملیت</h1>
        </div>

        <ContractFeature
          handelClick={handelClick}
          contractData={contractData || {}}
          setContractData={setContractData}
        />
      </Box>
    </div>
  );
};

export default ContractPage;
