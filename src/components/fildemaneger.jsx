/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import { fetchManager, sendManager } from 'src/hook/manager';
import { useMutation, useQuery } from '@tanstack/react-query';

const Fildemnager = ({ handleNext, cardSelected }) => {
  const [formSections, setFormSections] = useState([
    {
      name: '',
      position: '',
      national_code: '',
      national_id: '',
      phone: '',
      representative: '',
      is_legal: false,
      is_obliged: false,
      lock: false,
    },
  ]);
  const [fetchedData, setFetchedData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { data, status } = useQuery({
    queryKey: ['userMessage', cardSelected],
    queryFn: () => fetchManager(cardSelected),
  });

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (sections) => sendManager(cardSelected, sections),
  });

  useEffect(() => {
    if (status === 'success' && data) {
      const fetchedSections = data.data.length
        ? data.data
        : [
            {
              name: '',
              position: '',
              national_code: '',
              national_id: '',
              phone: '',
              representative: '',
              is_legal: false,
              is_obliged: false,
              lock: false,
            },
          ];
      setFetchedData(fetchedSections);
    }
  }, [data, status]);

  useEffect(() => {
    if (fetchedData.length) {
      setFormSections(fetchedData);
    }
  }, [fetchedData]);

  const types = [
    { type: false, title: 'حقیقی' },
    { type: true, title: 'حقوقی' },
  ];

  const movazaf = [
    { type: false, title: 'خیر' },
    { type: true, title: 'بله' },
  ];

  const handleAddSection = () => {
    setFormSections([
      ...formSections,
      {
        name: '',
        position: '',
        national_code: '',
        national_id: '',
        phone: '',
        representative: '',
        is_legal: false,
        is_obliged: false,
        lock: false,

      },
    ]);
  };

  const handleRemoveSection = (index) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const confirmRemoveSection = () => {
    if (selectedIndex !== null) {
      setFormSections(formSections.filter((_, i) => i !== selectedIndex));
    }
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedIndex(null);
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
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: 3,
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700">اطلاعات مدیران</h1>
        </div>
        <Box
          sx={{
            width: '100%',
            maxHeight: '60vh',
            overflowY: 'auto',
          }}
        >
          {formSections.map((section, sectionIndex) => (
            <form key={sectionIndex} className="w-full">
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                  gap: 2,
                  marginBottom: 4,
                  boxShadow: 6,
                  padding: 6,
                  position: 'relative',
                }}
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id={`company-type-label-${sectionIndex}`}>نوع شرکت</InputLabel>
                  <Select
                    labelId={`company-type-label-${sectionIndex}`}
                    id={`company-type-${sectionIndex}`}
                    label="نوع شرکت"
                    value={section.is_legal}
                    onChange={(e) => handleChange(sectionIndex, 'is_legal', e.target.value)}
                  >
                    {types.map((typeObj, index) => (
                      <MenuItem key={index} value={typeObj.type}>
                        {typeObj.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id={`position-${sectionIndex}`}
                  label="سمت"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.position}
                  onChange={(e) => handleChange(sectionIndex, 'position', e.target.value)}
                />
                {!section.is_legal && (
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
                )}
                {section.is_legal && (
                  <>
                    <TextField
                      type="text"
                      required
                      inputProps={{ maxLength: 10 }}
                      onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                      name="national_id"
                      id={`national-id-${sectionIndex}`}
                      label="کد شناسه"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={section.national_id}
                      onChange={(e) => handleChange(sectionIndex, 'national_id', e.target.value)}
                    />
                    <TextField
                      type="text"
                      required
                      name="representative"
                      id={`representative-${sectionIndex}`}
                      label="نماینده"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={section.representative}
                      onChange={(e) => handleChange(sectionIndex, 'representative', e.target.value)}
                    />
                  </>
                )}
                <TextField
                  type="text"
                  required
                  inputProps={{ maxLength: 11 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  name="phone"
                  id={`phone-${sectionIndex}`}
                  label="شماره تلفن"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.phone}
                  onChange={(e) => handleChange(sectionIndex, 'phone', e.target.value)}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id={`employee-label-${sectionIndex}`}>موظف</InputLabel>
                  <Select
                    labelId={`employee-label-${sectionIndex}`}
                    id={`employee-${sectionIndex}`}
                    label="موظف"
                    value={section.is_obliged}
                    onChange={(e) => handleChange(sectionIndex, 'is_obliged', e.target.value)}
                  >
                    {movazaf.map((typeObj, index) => (
                      <MenuItem key={index} value={typeObj.type}>
                        {typeObj.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={section.lock}
                      onChange={(e) => handleChange(sectionIndex, 'lock', e.target.checked)}
                    />
                  }
                  label="وضعیت"
                  sx={{ alignSelf: 'center' }}
                />
                {formSections.length > 1 && (
                  <IconButton
                    color="error"
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => handleRemoveSection(sectionIndex)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                )}
              </Box>

              {sectionIndex < formSections.length - 1 && <Divider sx={{ marginY: 4 }} />}
            </form>
          ))}
        </Box>

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
              افزودن فرم جدید
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

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
            تایید حذف
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              آیا مطمئن هستید که می‌خواهید این بخش را حذف کنید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              انصراف
            </Button>
            <Button onClick={confirmRemoveSection} color="error" autoFocus>
              حذف
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

Fildemnager.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Fildemnager;
