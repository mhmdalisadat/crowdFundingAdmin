import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useMediaQuery,
  Box,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  MobileStepper,
} from '@mui/material';
import PlanInvestors from './participant/participant';
import PlanDetail from './detail/planDetail';
import PlanComments from './comment/planComments';
import ControlledAccordions from '../reports/module/reportsView';
import ProfitPage from './profituser/profit';
import ControlledAccordionsEnd from './endoffundraising/feature/endoffunderaisingAccrdion';
import InvestorFeature from './investorPlan/investorFeatuer';
import InformationPage from './information&pic/page/informationPage';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PlanDetailTab = ({ planData, idRow, refetch }) => {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [openStepsDialog, setOpenStepsDialog] = React.useState(false);

  const steps = [
    'مشاهده',
    'سرمایه پذیر',
    'اطلاعات تکمیلی',
    'گزارشات',
    'گزارش سود کاربر',
    'نظرات',
    'سرمایه گذاران',
    'پایان جمع آوری وجه',
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStepClick = (index) => {
    setValue(index);
    setOpenStepsDialog(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PlanDetail />;
      case 1:
        return <InvestorFeature />;
      case 2:
        return <InformationPage />;
      case 3:
        return <ControlledAccordions />;
      case 4:
        return <ProfitPage />;
      case 5:
        return <PlanComments />;
      case 6:
        return <PlanInvestors />;
      case 7:
        return <ControlledAccordionsEnd />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isSmallScreen ? (
        <>
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={value}
            nextButton={
              <Button
                size="small"
                onClick={() => setValue(value + 1)}
                disabled={value === steps.length - 1}
              >
                بعدی
              </Button>
            }
            backButton={
              <Button size="small" onClick={() => setValue(value - 1)} disabled={value === 0}>
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
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>انتخاب مرحله</DialogTitle>
            <List>
              {steps.map((label, index) => (
                <ListItem
                  button
                  key={label}
                  onClick={() => handleStepClick(index)}
                  selected={value === index}
                >
                  <ListItemText
                    primary={label}
                    sx={{
                      textAlign: 'center',
                      fontWeight: value === index ? 'bold' : 'normal',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Dialog>
        </>
      ) : (
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {steps.map((label, index) => (
            <Tab key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      )}

      <Box sx={{ marginTop: 2 }}>{renderStepContent(value)}</Box>
    </Box>
  );
};

PlanDetailTab.propTypes = {
  planData: PropTypes.object.isRequired,
  idRow: PropTypes.string.isRequired,
  refetch: PropTypes.func,
};

export default PlanDetailTab;
