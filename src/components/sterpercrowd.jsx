import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  Box,
  Grid,
  MobileStepper,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import ContractPage from 'src/module/Create_receiveRrequests/contract/page/contarctPage';
import useNavigateStep from 'src/hooks/use-navigate-step';
import HistoryPage from 'src/module/Create_receiveRrequests/history/page/historyPage';
import ManagerPage from 'src/module/Create_receiveRrequests/managers/page/managerpage';
import ManagerdocumentsPage from 'src/module/Create_receiveRrequests/Managerdocuments/page/Managerdocuments';
import { ShareholderPage } from 'src/module/Create_receiveRrequests/shareholder/page';
import { ValidationPage } from 'src/module/Create_receiveRrequests/validation/page';
import CompanyInfoPage from 'src/module/Create_receiveRrequests/companyInfo/page/companyInfopage';
import CardPage from 'src/module/Create_receiveRrequests/cart/page/cartPage';
import { OtherCasesPage } from 'src/module/Create_receiveRrequests/otherCases/page';

const Sterpercrowd = () => {
  const { page, changePage } = useNavigateStep();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [openStepsDialog, setOpenStepsDialog] = useState(false);

  const steps = [
    'درخواست ها',
    'اطلاعات درخواست',
    'مدیران',
    'مستندات مدیران',
    'سهامداران',
    'اعتبار سنجی',
    'سایر موارد',
    'سوپیشینه',
    'قرارداد عاملیت',
  ];

  const changePageSafely = (newPage) => {
    if (newPage >= 0 && newPage < steps.length) {
      changePage(newPage);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CardPage />;
      case 1:
        return <CompanyInfoPage />;
      case 2:
        return <ManagerPage />;
      case 3:
        return <ManagerdocumentsPage />;
      case 4:
        return <ShareholderPage />;
      case 5:
        return <ValidationPage />;
      case 6:
        return <OtherCasesPage />;
      case 7:
        return <HistoryPage />;
      case 8:
        return <ContractPage />;
      default:
        return (
          <div className="flex items-center justify-center mt-8 text-lg">
            منتظر بررسی اطلاعات باشید
          </div>
        );
    }
  };

  const handleStepClick = (index) => {
    changePageSafely(index);
    setOpenStepsDialog(false);
  };

  return (
    <Box sx={{ padding: isSmallScreen ? '0 8px' : '0 16px' }}>
      {isSmallScreen ? (
        <>
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={page}
            nextButton={
              <Button
                size="small"
                onClick={() => changePageSafely(page + 1)}
                disabled={page === steps.length - 1}
              >
                بعدی
              </Button>
            }
            backButton={
              <Button size="small" onClick={() => changePageSafely(page - 1)} disabled={page === 0}>
                قبلی
              </Button>
            }
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setOpenStepsDialog(true)}
            sx={{
              marginTop: '16px',
            }}
          >
            مشاهده همه مراحل
          </Button>
          <Dialog open={openStepsDialog} onClose={() => setOpenStepsDialog(false)}>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              انتخاب مرحله
            </DialogTitle>
            <List>
              {steps.map((label, index) => (
                <ListItem
                  button
                  key={label}
                  onClick={() => handleStepClick(index)}
                  selected={page === index}
                >
                  <ListItemText
                    primary={label}
                    sx={{
                      textAlign: 'center',
                      fontWeight: page === index ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Dialog>
        </>
      ) : (
        <Stepper
          sx={{ marginTop: '20px' }}
          activeStep={page}
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step key={index} onClick={() => changePageSafely(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <div style={{ position: 'relative', minHeight: '300px' }}>{renderStepContent(page)}</div>
        </Grid>
      </Grid>

      <ToastContainer />
    </Box>
  );
};

export default Sterpercrowd;
