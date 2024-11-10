import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { SubmitButton } from 'src/components/button';
import Styles from '../style.jsx/historyStyle';
import HistoryFeature from '../feature/historyfeature';
import useGetHistory from '../service/useGetHistory';
import usePostHistory from '../service/usePostHistory';

const HistoryPage = () => {
  const { cartId } = UseCartId();
  const { data, isPending, isError } = useGetHistory(cartId);
  const { incrementPage } = useNavigateStep();
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    if (!isError && data && data.manager && !isPending) {
      setFormData(data.manager.map((item) => ({ ...item })));
    }
  }, [data, isError, isPending]);

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file = file;
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file = null;
    setFormData(newFormData);
  };

  const handleSwitchChange = (index) => (event) => {
    const isChecked = event.target.checked;

    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      newFormData[index] = {
        ...newFormData[index],
        lock: isChecked,
      };

      return newFormData;
    });
  };

  const handleTextFieldChange = (index, field) => (event) => {
    const newFormData = [...formData];
    if (field === 'file') {
      newFormData[index][field] = event;
    } else {
      newFormData[index][field] = event.target.value;
    }
    setFormData(newFormData);
  };

  const {
    mutate,
    isError: isErrorPost,
    isPending: isPendingPost,
    isSuccess: isSuccessPost,
  } = usePostHistory(cartId);

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
          <h1 className="text-2xl font-bold text-gray-700">سوءپیشینه</h1>
        </div>
        {formData.length > 0 &&
          formData.map((item, index) => {
            if (!item) return null;
            return (
              <HistoryFeature
                key={index}
                index={index}
                item={item}
                handleTextFieldChange={handleTextFieldChange}
                handleSwitchChange={handleSwitchChange}
                handleRemoveFile={handleRemoveFile}
                handleFileChange={handleFileChange}
                setFormData={setFormData}
              />
            );
          })}
        <SubmitButton onClick={handleButtonClick} />
      </Box>
    </div>
  );
};

export default HistoryPage;
