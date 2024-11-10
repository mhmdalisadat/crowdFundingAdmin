import { Box } from '@mui/material';
import UseCartId from 'src/hooks/card_id';
import { useEffect, useState } from 'react';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { SubmitButton } from 'src/components/button';
import Validationfeatuer from '../featuer/validationfeatuer';
import Styles from '../style.jsx/manageStyle';
import useGetValidation from '../service/useGetValidation';
import usePostValidation from '../service/usePostValidation';

const ValidationPage = () => {
  const { cartId } = UseCartId();

  const { data, isPending, isError } = useGetValidation(cartId);

  const { incrementPage } = useNavigateStep();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (!isError && data && !isPending) {
      setFormData(data.data.managers.map((item) => ({ ...item })));
    }
  }, [data, isError, isPending]);

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file_manager = file;
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file_manager = null;
    setFormData(newFormData);
  };

  const handleSwitchChange = (index) => (event) => {
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      newFormData[index].lock = event.target.checked;
      return newFormData;
    });
  };

  const handleTextFieldChange = (index, field) => (event) => {
    const newFormData = [...formData];
    newFormData[index][field] = event.target.value;
    setFormData(newFormData);
  };

  const {
    mutate,
    isError: isErrorPost,
    isPending: isPendingPost,
    isSuccess: isSuccessPost,
  } = usePostValidation(cartId);

  useEffect(() => {
    if (!isErrorPost && !isPendingPost && isSuccessPost) {
      incrementPage();
    }
  }, [incrementPage, isErrorPost, isPendingPost, isSuccessPost]);

  const handleButtonClick = () => {
    mutate({ formData });
  };

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اعتبار سنجی</h1>
        </div>
        {formData &&
          formData.map((item, index) => (
            <Validationfeatuer
              key={index}
              handleFileChange={handleFileChange}
              handleTextFieldChange={handleTextFieldChange}
              handleSwitchChange={handleSwitchChange}
              handleRemoveFile={handleRemoveFile}
              item={item}
              index={index}
              setFormData={setFormData}
            />
          ))}
        <SubmitButton onClick={handleButtonClick} />
      </Box>
    </div>
  );
};

export default ValidationPage;
