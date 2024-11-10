import { Box, Button, Input } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const ValidationFile = ({ item, handleRemoveFile, handleFileChange, index }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: 'flex-start',
    }}
  >
    {typeof item.file_manager === 'string' ? (
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
          href={`${OnRun}/${item.file_manager}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '14px',
            fontWeight: 'medium',
          }}
        >
          مشاهده فایل بارگذاری شده
          <FileCopyOutlinedIcon style={{ fontSize: '16px' }} />
        </a>
        <Button size="small" onClick={handleRemoveFile(index)}>
          حذف
        </Button>
      </Box>
    ) : (
      <Input
        name="claims_status"
        type="file"
        onChange={(e) => handleFileChange(e.target.files[0], index)}
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

ValidationFile.propTypes = {
  item: PropTypes.object,
  handleRemoveFile: PropTypes.func,
  handleFileChange: PropTypes.func,
  index: PropTypes.number,
};
export default ValidationFile;
