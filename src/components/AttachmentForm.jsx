import { Box, Input, FormControl, FormLabel, Typography, Switch } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const AttachmentForm = ({ formData, onFileChange }) => {

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    if (onFileChange && files.length > 0) {
      onFileChange(name, files[0]);
    }
  };

  return formData ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            padding: '20px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginBottom: '16px',
            width: '48%',
          }}
        >
          <Typography variant="h6">گزارشات و مستندات به روز</Typography>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                صورت مالی
                <Switch
                  name="Lock_financial_report_thisyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_financial_report_thisyear}
                />
              </FormLabel>
              <Input
                name="financial_report_thisyear"
                type="file"
                id="file-upload-1"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                گزارش حسابرسی
                <Switch
                  name="Lock_audit_report_thisyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_audit_report_thisyear}
                />
              </FormLabel>
              <Input
                name="audit_report_thisyear"
                type="file"
                id="file-upload-2"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                اظهارنامه
                <Switch
                  name="Lock_statement_thisyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_statement_thisyear}
                />
              </FormLabel>
              <Input
                name="statement_thisyear"
                type="file"
                id="file-upload-3"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                تراز 6ستونی
                <Switch
                  name="Lock_alignment_6columns_thisyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_alignment_6columns_thisyear}
                />
              </FormLabel>
              <Input
                name="alignment_6columns_thisyear"
                type="file"
                id="file-upload-4"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            padding: '20px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginBottom: '16px',
            width: '48%',
          }}
        >
          <Typography variant="h6">گزارشات و مستندات منتهی به سال 1401</Typography>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                صورت مالی
                <Switch
                  name="Lock_financial_report_lastyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_financial_report_lastyear}
                />
              </FormLabel>
              <Input
                name="financial_report_lastyear"
                type="file"
                id="file-upload-5"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                گزارش حسابرسی
                <Switch
                  name="Lock_audit_report_lastyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_audit_report_lastyear}
                />
              </FormLabel>
              <Input
                name="audit_report_lastyear"
                type="file"
                id="file-upload-6"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                اظهارنامه
                <Switch
                  name="Lock_statement_lastyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_statement_lastyear}
                />
              </FormLabel>
              <Input
                name="statement_lastyear"
                type="file"
                id="file-upload-7"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                تراز 6ستونی
                <Switch
                  name="Lock_alignment_6columns_lastyear"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_alignment_6columns_lastyear}
                />
              </FormLabel>
              <Input
                name="alignment_6columns_lastyear"
                type="file"
                id="file-upload-8"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            padding: '20px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginBottom: '16px',
            width: '48%',
          }}
        >
          <Typography variant="h6">گزارشات و مستندات منتهی به سال 1402</Typography>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                صورت مالی
                <Switch
                  name="Lock_financial_report_yearold"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_financial_report_yearold}
                />
              </FormLabel>
              <Input
                name="financial_report_yearold"
                type="file"
                id="file-upload-9"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                گزارش حسابرسی
                <Switch
                  name="Lock_audit_report_yearold"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_audit_report_yearold}
                />
              </FormLabel>
              <Input
                name="audit_report_yearold"
                type="file"
                id="file-upload-10"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                اظهارنامه
                <Switch
                  name="Lock_statement_yearold"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_statement_yearold}
                />
              </FormLabel>
              <Input
                name="statement_yearold"
                type="file"
                id="file-upload-11"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginBottom: '16px' }}>
            <FormControl fullWidth>
              <FormLabel>
                تراز 6ستونی
                <Switch
                  name="Lock_alignment_6columns_yearold"
                  inputProps={{ 'aria-label': 'controlled' }}
                  className="ml-4"
                  checked={formData.Lock_alignment_6columns_yearold}
                />
              </FormLabel>
              <Input
                name="alignment_6columns_yearold"
                type="file"
                id="file-upload-12"
                sx={{ marginTop: '8px' }}
                onChange={handleFileChange}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : null;
};

AttachmentForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AttachmentForm;
