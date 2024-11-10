import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { SubmitButton } from 'src/components/button';
import SwitchWithFileInput from 'src/components/fild/filefiled';
import useGetOther from '../service/useGetOtherCases';
import { otherLocalData } from '../objects';
import { usePostOther } from '../service';

const OtherCasesFeatuer = () => {
  const { cartId } = UseCartId();
  const { data } = useGetOther(cartId);
  const [localData, setLocalData] = useState(otherLocalData);

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      updated[type] = null;
      return updated;
    });
  };

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const { incrementPage } = useNavigateStep();
  const { mutate } = usePostOther(cartId);
  const handleButtonClick = () => {
    mutate({ cartId, localData });
    incrementPage();
  };

  return (
    <form className="w-full">
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
          switchLabel="لیست اظهار دارایی ها و بدهی ها"
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
          switchLabel=" گردش حسابهای مالی اصلی شرکت"
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
          switchLabel="آگهی آخرین تغییرات
        مدیران"
          fileKey="announcement_of_changes_managers"
          localData={localData}
          setLocalData={setLocalData}
          handleFileRemove={handleFileRemove}
          OnRun={OnRun}
        />
        <SwitchWithFileInput
          switchLabel="معرف حسابرس"
          fileKey="auditor_representative"
          localData={localData}
          setLocalData={setLocalData}
          handleFileRemove={handleFileRemove}
          OnRun={OnRun}
        />
        <SwitchWithFileInput
          switchLabel="اعلان شماره حساب"
          fileKey="announcing_account_number"
          localData={localData}
          setLocalData={setLocalData}
          handleFileRemove={handleFileRemove}
          OnRun={OnRun}
        />

        <SwitchWithFileInput
          switchLabel=" کاتالوگ محصولات "
          fileKey="product_catalog"
          localData={localData}
          setLocalData={setLocalData}
          handleFileRemove={handleFileRemove}
          OnRun={OnRun}
        />
        <SwitchWithFileInput
          switchLabel="  مجوز ها   "
          fileKey="licenses"
          localData={localData}
          setLocalData={setLocalData}
          handleFileRemove={handleFileRemove}
          OnRun={OnRun}
        />
      </Box>

      <SubmitButton onClick={handleButtonClick} />
    </form>
  );
};

export default OtherCasesFeatuer;
