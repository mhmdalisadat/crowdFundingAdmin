/* eslint-disable import/no-extraneous-dependencies */
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';

// ----------------------------------------------------------------------


const navConfig = [
  {
    title: 'میزکار',
    path: '/',
    icon: <DashboardIcon className="text-2xl" />,
  },
  {
    title: 'ایجاد و پیگیری درخواست',
    path: '/card',
    icon: <AssignmentIcon className="text-2xl" />,
  },
  {
    title: 'طرح ها',
    path: '/plans',
    icon: <ListIcon className="text-2xl" />,
  },
  {
    title: 'اطلاعات کاربران',
    path: '/user',
    icon: <PeopleIcon className="text-2xl" />,
  },
  {
    title: 'کمیته ارزیابی',
    path: '/evaluationCommittee',
    icon: <AssessmentIcon className="text-2xl" />,
  },
  {
    title: 'کمیته ریسک',
    path: '/riskCommittee',
    icon: <SecurityIcon className="text-2xl" />,
  },
];

export default navConfig;
