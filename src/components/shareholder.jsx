/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchShareholder, sendShareholder } from 'src/hook/shareholder';

const singleFile = {
  name: '',
  national_code: '',
  percent: '',
  lockName: false,
  lockNationalCode: false,
  lockPercent: false,
  phone: '',
  lock: false,
};

const Shareholder = ({ handleNext, cardSelected }) => {
  const [formSections, setFormSections] = useState([singleFile]);
  const [fetchedData, setFetchedData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const { data, status } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchShareholder(cardSelected),
  });

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (sections) => sendShareholder(cardSelected, sections),
  });

  useEffect(() => {
    if (status === 'success' && data && data.data) {
      setFetchedData(data.data || [singleFile]);
    }
  }, [data, status]);

  useEffect(() => {
    if (fetchedData.length) {
      setFormSections(fetchedData);
    }
  }, [fetchedData]);

  const handleAddSection = () => {
    setFormSections([...formSections, { ...singleFile }]);
  };

  const handleRemoveSection = () => {
    if (deleteIndex !== null) {
      setFormSections(formSections.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
    setOpenDialog(false);
  };

  const handleOpenDialog = (index) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleChange = (index, input, value) => {
    const updatedSections = formSections.map((section, i) =>
      i === index ? { ...section, [input]: value } : section
    );
    setFormSections(updatedSections);
  };

  const handleSubmit = () => {
    mutation.mutateAsync(formSections);
    handleNext();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '80vh',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: 3,
          overflowY: 'auto',
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700">سهامداران</h1>

        </div>

        {formSections && formSections.length > 0 ? (
          formSections.map((section, sectionIndex) => (
            <form key={sectionIndex} className="w-full">
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                  gap: 2,
                  marginBottom: 4,
                  boxShadow: 6,
                  padding: 6,
                  position: 'relative',
                }}
                F
              >
                <TextField
                  id={`name-${sectionIndex}`}
                  label="نام و نام خانوادگی"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.name}
                  onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
                />
                <TextField
                  type="text"
                  name="national_code"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  required
                  id={`national-code-${sectionIndex}`}
                  label="کد ملی"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.national_code}
                  onChange={(e) => handleChange(sectionIndex, 'national_code', e.target.value)}
                />
                <TextField
                  type="text"
                  name="phone"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  required
                  id={`phone-${sectionIndex}`}
                  label="شماره تلفن"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.phone}
                  onChange={(e) => handleChange(sectionIndex, 'phone', e.target.value)}
                />
                <TextField
                  type="number"
                  required
                  inputProps={{
                    step: '0.1',
                    min: 0,
                    max: 100,
                  }}
                  name="percent"
                  id={`percent-${sectionIndex}`}
                  label="درصد"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.percent}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!Number.isNaN(value) && value >= 0 && value <= 100) {
                      handleChange(sectionIndex, 'percent', value.toFixed(0));
                    } else {
                      handleChange(sectionIndex, 'percent', '0');
                    }
                  }}
                  disabled={section.lockPercent}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={section.lock}
                      onChange={(e) => handleChange(sectionIndex, 'lock', e.target.checked)}
                    />
                  }
                  label="وضعیت"
                  sx={{ gridColumn: 'span 3', alignSelf: 'center' }}
                />
                {formSections.length > 1 && (
                  <IconButton
                    color="error"
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => handleOpenDialog(sectionIndex)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                )}
              </Box>

              {sectionIndex < formSections.length - 1 && <Divider sx={{ marginY: 4 }} />}
            </form>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            اطلاعاتی موجود نمیباشد
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 3,
            width: '100%',
          }}
        >
          <div className="flex justify-center gap-3">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddSection}
              sx={{
                width: '40%',
                textTransform: 'none',
              }}
            >
              افزودن
            </Button>
          </div>

          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              py: 1,
              px: 2,
            }}
            onClick={handleSubmit}
          >
            تایید
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>تأیید حذف</DialogTitle>
        <DialogContent>
          <Typography>آیا مطمئن هستید که می‌خواهید این بخش را حذف کنید؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>لغو</Button>
          <Button onClick={handleRemoveSection} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Shareholder.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Shareholder;
