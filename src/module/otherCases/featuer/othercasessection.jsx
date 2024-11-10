import React from 'react';
import { Box } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import SwitchWithFileInput from 'src/components/fild/filefiled';
import PropTypes from 'prop-types';

const MainForm = ({ localData, setLocalData }) => {
  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      updated[type] = null;
      return updated;
    });
  };

  return (
    <Box
      sx={{
        padding: '20px',
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        marginBottom: '16px',
      }}
    >
      <SwitchWithFileInput
        switchLabel="وضعیت دعاوی"
        fileKey="claims_status"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
      <SwitchWithFileInput
        switchLabel="آخرین لیست بیمه کارکنان"
        fileKey="latest_insurance_staf"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
      <SwitchWithFileInput
        switchLabel="لیست دایی ها و بدهی ها"
        fileKey="assets_and_liabilities"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
      <SwitchWithFileInput
        switchLabel="اساسنامه"
        fileKey="statutes"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
      <SwitchWithFileInput
        switchLabel="فایل گردش حسابهای بانکی اصلی شرکت"
        fileKey="bank_account_turnover"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
      <SwitchWithFileInput
        switchLabel="آگهی آخرین تغییرات سرمایه ای"
        fileKey="announcement_of_changes_capital"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
      <SwitchWithFileInput
        switchLabel="آگهی آخرین تغییرات مدیران"
        fileKey="announcement_of_changes_managers"
        localData={localData}
        setLocalData={setLocalData}
        handleFileRemove={handleFileRemove}
        OnRun={OnRun}
      />
    </Box>
  );
};

MainForm.propTypes = {
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
};

export default MainForm;
