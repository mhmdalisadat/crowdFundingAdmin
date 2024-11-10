import { Box } from '@mui/material';
import UseCartId from 'src/hooks/card_id';
import { useEffect, useState } from 'react';
import { SubmitButton } from 'src/components/button';
import useNavigateStep from 'src/hooks/use-navigate-step';
import ManagerdocumentsFeatuer from '../featuer/Managerdocumentsfeatuer';
import useGetResume from '../service/useGetResume';
import usePostResume from '../service/usePostResume';

const ManagerdocumentsPage = () => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();

  const { data, isPending,isError } = useGetResume(cartId)
  const [formData, setFormData] = useState([]);
  
  

  useEffect(() => {
    if (!isError && data && !isPending) {
      setFormData(data.manager.map((item) => ({ ...item, lock: item.lock || false })));
    }
  }, [data, isError, isPending]);

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


  const {mutate,isError:isErrorPost,isPending:isPendingPost,isSuccess:isSuccessPost} = usePostResume(cartId)

  const handleButtonClick = () => {
    mutate({formData});
  };


  useEffect(()=>{
    if (!isErrorPost && !isPendingPost && isSuccessPost) {
      incrementPage()
    }
  },[incrementPage, isErrorPost, isPendingPost, isSuccessPost])

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
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center ">
          <h1 className="text-2xl font-bold text-gray-700">مستندات مدیران</h1>
        </div>

        {formData.length > 0 &&
          formData.map((item, index) => (
            <ManagerdocumentsFeatuer
            key={item.id || index} 
            index={index}
            item={item} 
            handleSwitchChange={handleSwitchChange}
            handleTextFieldChange={handleTextFieldChange}
            formData={Array.isArray(formData) ? formData : []}
            setFormData={setFormData}
          />
          ))}
          
        <SubmitButton onClick={handleButtonClick} />
      </Box>
    </div>
  );
};

export default ManagerdocumentsPage;
