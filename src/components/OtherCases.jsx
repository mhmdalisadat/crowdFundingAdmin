import { Box, Button, FormControl, FormLabel, Input } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { fetchOtherCases, sendOtherCases } from 'src/hook/otherCases';

const OtherCases = ({ cardSelected, handleNext }) => {
  const { data, error, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cardSelected],
    queryFn: () => fetchOtherCases(cardSelected),
  });

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: () => sendOtherCases(cardSelected, localData),
  });
  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {
    if (isSuccess && data) {
      setLocalData(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.warning(error);
    }
  }, [isError, error]);

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      updated[type] = null;
      return updated;
    });
  };

  const handleButtonClick = () => {
    mutation.mutate();
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
          <h1 className="text-5xl font-bold text-gray-700">سایر موارد</h1>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <form className="w-full">
            <Box
              sx={{
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    وضعیت دعاوی:
                  </FormLabel>
                  {typeof localData.claims_status === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.claims_status}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                        }}
                      >
                        فایل وضعیت دعاوی
                      </Link>
                      <Button onClick={() => handleFileRemove('claims_status')}>حذف</Button>
                    </Box>
                  ) : (
                    <Input
                      name="claims_status"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, claims_status: e.target.files[0] })
                      }
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
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    :آخرین لیست بیمه کارکنان
                  </FormLabel>
                  {typeof localData.latest_insurance_staf === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.latest_insurance_staf}`}
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                        }}
                      >
                        فایل لیست بیمه کارکنان
                      </Link>
                      <Button onClick={() => handleFileRemove('latest_insurance_staf')}>حذف</Button>
                    </Box>
                  ) : (
                    <Input
                      name="latest_insurance_staf"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          latest_insurance_staf: e.target.files[0],
                        })
                      }
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
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    لیست دایی ها و بدهی ها:
                  </FormLabel>
                  {typeof localData.assets_and_liabilities === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.assets_and_liabilities}`}
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                        }}
                      >
                        فایل لیست دایی ها و بدهی ها
                      </Link>
                      <Button onClick={() => handleFileRemove('assets_and_liabilities')}>
                        حذف
                      </Button>
                    </Box>
                  ) : (
                    <Input
                      name="assets_and_liabilities"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          assets_and_liabilities: e.target.files[0],
                        })
                      }
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
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    اساسنامه:
                  </FormLabel>
                  {typeof localData.statutes === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.statutes}`}
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                        }}
                      >
                        فایل لیست دایی ها و بدهی ها
                      </Link>
                      <Button onClick={() => handleFileRemove('statutes')}>حذف</Button>
                    </Box>
                  ) : (
                    <Input
                      name="statutes"
                      type="file"
                      onChange={(e) => setLocalData({ ...localData, statutes: e.target.files[0] })}
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
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    فایل گردش حسابهای بانکی اصلی شرکت:
                  </FormLabel>
                  {typeof localData.bank_account_turnover === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.bank_account_turnover}`}
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                          color: localData.Lock_bank_account_turnover ? '#9e9e9e' : '#1e88e5',
                          '&:hover': {
                            color: localData.Lock_bank_account_turnover ? '#9e9e9e' : '#1565c0',
                          },
                        }}
                      >
                        فایل گردش حسابهای بانکی اصلی شرکت
                      </Link>
                      <Button onClick={() => handleFileRemove('bank_account_turnover')}>حذف</Button>
                    </Box>
                  ) : (
                    <Input
                      name="bank_account_turnover"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          bank_account_turnover: e.target.files[0],
                        })
                      }
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
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    آگهی آخرین تغییرات سرمایه ای:
                  </FormLabel>
                  {typeof localData.announcement_of_changes_capital === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.announcement_of_changes_capital}`}
                        
                        onClick={(e) =>
                          localData.Lock_announcement_of_changes_capital && e.preventDefault()
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                          color: localData.Lock_announcement_of_changes_capital
                            ? '#9e9e9e'
                            : '#1e88e5',
                          '&:hover': {
                            color: localData.Lock_announcement_of_changes_capital
                              ? '#9e9e9e'
                              : '#1565c0',
                          },
                        }}
                      >
                        فایل آگهی آخرین تغییرات سرمایه ای
                      </Link>
                      <Button
                        onClick={() => handleFileRemove('announcement_of_changes_capital')}
                        disabled={localData.Lock_announcement_of_changes_capital}
                      >
                        حذف
                      </Button>
                    </Box>
                  ) : (
                    <Input
                      name="announcement_of_changes_capital"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          announcement_of_changes_capital: e.target.files[0],
                        })
                      }
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
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      color: '#424242',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    آگهی آخرین تغییرات مدیران:
                  </FormLabel>
                  {typeof localData.announcement_of_changes_managers === 'string' ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${localData.announcement_of_changes_managers}`}
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                          color: localData.Lock_announcement_of_changes_managers
                            ? '#9e9e9e'
                            : '#1e88e5',
                          '&:hover': {
                            color: localData.Lock_announcement_of_changes_managers
                              ? '#9e9e9e'
                              : '#1565c0',
                          },
                        }}
                      >
                        فایل آگهی آخرین تغییرات مدیران
                      </Link>
                      <Button
                        onClick={() => handleFileRemove('announcement_of_changes_managers')}
                        disabled={localData.Lock_announcement_of_changes_managers}
                      >
                        حذف
                      </Button>
                    </Box>
                  ) : (
                    <Input
                      name="announcement_of_changes_managers"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          announcement_of_changes_managers: e.target.files[0],
                        })
                      }
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
                </FormControl>
              </Box>
            </Box>

            <Button
              onClick={handleButtonClick}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              تایید
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
};
OtherCases.propTypes = {
  cardSelected: PropTypes.string,
  handleNext: PropTypes.func,
};

export default OtherCases;
