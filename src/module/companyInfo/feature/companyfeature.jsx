import { Box } from '@mui/material';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { SubmitButton } from 'src/components/button';
import UseCartId from 'src/hooks/card_id';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Logo from './logo';
import ColumnsThisyear from './alignment_6columns_thisyear';
import ReportLastYear from './report_lastyear';
import CompanyInfoInput from './companyinput';
import { createCart } from '../service/compantInfoService';
import ReportYaerOld from './report_yearold';

const CompanyFeatuet = ({ localData, handleFileRemove, handleRangeChange, setLocalData }) => {
  const { incrementPage } = useNavigateStep();
  const { cartId } = UseCartId();

  const mutation = useMutation({ mutationFn: () => createCart(localData, cartId) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation.mutateAsync(localData, cartId);
    incrementPage();
  };

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mt={4}>
        <div>
          <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-700">اطلاعات درخواست</h1>
          </div>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: '20px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                maxWidth: '1200px',
                width: '100%',
              }}
            >
              <CompanyInfoInput
                setLocalData={setLocalData}
                localData={localData}
                handleRangeChange={handleRangeChange}
              />

              <Box display="flex" justifyContent="center" width="100%" mt={4}>
                <div className="mt-10">
                  <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-700">پیوست اسناد</h1>
                  </div>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100vh',
                      padding: '20px',
                      width: '100%',
                    }}
                  >
                    <div className="flex items-center justify-center mb-8">
                      <PriorityHighIcon className="text-2xl text-red-600 mr-2" />
                      <p className="text-xl text-red-600 font-semibold">
                        حجم فایل می تواند 20 مگابایت باشد
                      </p>
                    </div>

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        justifyContent: 'center',
                        maxWidth: '1200px',
                        width: '100%',
                      }}
                    >
                                            <p>
                        تایپ های مجاز برای ارسال فایل :png ,jpg ,pdf ,rar ,jpeg ,docx ,xlsx ,csv
                        ,xls , zip
                      </p>
                      <ReportLastYear
                        setLocalData={setLocalData}
                        localData={localData}
                        handleFileRemove={handleFileRemove}
                      />
                      <ReportYaerOld
                        setLocalData={setLocalData}
                        localData={localData}
                        handleFileRemove={handleFileRemove}
                      />
                      <ColumnsThisyear
                        setLocalData={setLocalData}
                        localData={localData}
                        handleFileRemove={handleFileRemove}
                      />
                      <Logo
                        setLocalData={setLocalData}
                        localData={localData}
                        handleFileRemove={handleFileRemove}
                      />
                    </Box>
                  </Box>
                </div>
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

CompanyFeatuet.propTypes = {
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
  handleFileRemove: PropTypes.func,
  handleRangeChange: PropTypes.func,
};

export default CompanyFeatuet;
