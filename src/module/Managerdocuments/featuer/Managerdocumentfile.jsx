import { Box, Button, Input as MuiInput } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PropTypes from 'prop-types';

const ManagerdocumentFile = ({ index: key, item, formData, setFormData }) => {
  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], file };
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file = null;
    setFormData(newFormData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      {typeof item.file === 'string' && item.file ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f7f7f7',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <a
            href={`${OnRun}/${item.file}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '14px',
              fontWeight: 'medium',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            مشاهده فایل رزومه
            <FileCopyOutlinedIcon style={{ fontSize: '16px', marginLeft: '4px' }} />
          </a>
          <Button size="small" onClick={handleRemoveFile(key)} sx={{ height: 'auto', ml: '10px' }}>
            حذف
          </Button>
        </Box>
      ) : (
        <MuiInput
          name="claims_status"
          type="file"
          onChange={(e) => handleFileChange(e.target.files[0], key)}
          sx={{
            borderRadius: '8px',
            width: '100%',
            color: '#424242',
            '&:focus': {
              outline: 'none',
              borderColor: '#3f51b5',
              boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
            },
          }}
        />
      )}
    </Box>
  );
};

ManagerdocumentFile.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  formData: PropTypes.array,
  setFormData: PropTypes.func,
};

export default ManagerdocumentFile;
