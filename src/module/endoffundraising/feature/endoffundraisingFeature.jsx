import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ToastContainer } from 'react-toastify';
import { useFetchDocumentation } from '../hooks/useDocumentation';
import 'react-toastify/dist/ReactToastify.css';

const EndOffUndraisingFeature = () => {
  const { id } = useParams();
  const { data: formData, getData, postDate, updateData } = useFetchDocumentation(id);
  const [localFormData, setLocalFormData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (formData?.data?.length > 0) {
      setLocalFormData(formData.data);
    }
  }, [formData]);

  const handelPost = () => {
    const dataToPost = {
      timestamp: selectedDate,
    };
    postDate(dataToPost);
    getData();
  };

  const handleUpdate = async () => {
    updateData(localFormData);
  };

  const handleChangeAmount = (index, value) => {
    const updatedData = localFormData.map((item, idx) =>
      idx === index ? { ...item, amount: value } : item
    );
    setLocalFormData(updatedData);
  };

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
        {localFormData.length > 0 ? (
          localFormData.map((item, index) => (
            <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                  flexDirection: 'row',
                }}
              >
                <Typography sx={{ fontWeight: 'bold', marginRight: 2 }}>مبلغ چک:</Typography>
                <TextField
                  label="مبلغ"
                  value={formatNumber(item.amount || '')}
                  onChange={(e) => handleChangeAmount(index, e.target.value)}
                  sx={{ flexGrow: 1, minWidth: '150px', marginLeft: 3 }}
                  variant="outlined"
                />
                <Typography sx={{ fontWeight: 'bold', marginLeft: 3 }}>تاریخ چک:</Typography>
                <Box sx={{ minWidth: '150px', marginLeft: 3 }}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    value={item.date_jalali}
                    onChange={(date) => {
                      const updatedData = [...localFormData];
                      updatedData[index].date_jalali = date.format('YYYY/MM/DD');
                      setLocalFormData(updatedData);
                    }}
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '10px',
                      borderRadius: '5px',
                      borderColor: '#ccc',
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Box sx={{ marginBottom: 2 }}>
            <div style={{ direction: 'rtl' }}>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={setSelectedDate}
                style={{
                  minWidth: '550px',
                  width: '100%',
                  height: '50px',
                  padding: '10px',
                  borderRadius: '5px',
                  borderColor: '#ccc',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <Button variant="contained" color="primary" onClick={handelPost}>
                پایان
              </Button>
            </div>
          </Box>
        )}
        {localFormData.length > 0 && (
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            بروزرسانی
          </Button>
        )}
      </Box>
    </>
  );
};

export default EndOffUndraisingFeature;
