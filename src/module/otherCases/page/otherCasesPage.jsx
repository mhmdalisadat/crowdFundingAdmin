/* eslint-disable arrow-body-style */
import { Box } from '@mui/material';
import Styles from '../style.jsx/manageStyle';
import OtherCasesFeatuer from '../featuer';

const OtherCasesPage = () => {

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سایر موارد</h1>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <OtherCasesFeatuer

          />
        </div>
      </Box>
    </div>
  );
};

export default OtherCasesPage;
