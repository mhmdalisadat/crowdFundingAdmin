import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion, AnimatePresence } from 'framer-motion';
import FilterListIcon from '@mui/icons-material/FilterList';
import { OnRun } from 'src/api/OnRun';
import { useGetPlans } from '../../hooks/getPlans';
import useUpdatePlan from '../../service/planCard/useUpdatePlan';
import ProgressLineChart from './progressLBar';

const statuses = ['1', '2', '3', '4', '5'];

const PlanTableFeature = () => {
  const [planData, setPlanData] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();

  const { data: plans, isLoading, isError } = useGetPlans();

  const { mutate } = useUpdatePlan();
  const handleLoadClick = () => {
    setIsRotating(true);

    mutate(planData);
    setTimeout(() => setIsRotating(false), 2000);
  };

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const statusColors = {
    1: '#2786ff',
    2: '#0dab3a',
    3: '#ff9800',
    4: '#ff6780',
    5: '#9e9e9e',
  };

  const getStatusTitle = (status) => {
    switch (status) {
      case '1':
        return 'شروع شده';
      case '2':
        return 'جمع آوری';
      case '3':
        return 'تمدید شده';
      case '5':
        return 'تکمیل شده';
      case '4':
        return 'سررسید ناموفق';
      default:
        return 'نامشخص';
    }
  };

  useEffect(() => {
    if (!isError && plans && !isLoading) {
      setPlanData(plans);
    }
  }, [plans, isError, isLoading]);

  const handleCardClick = (trace_code) => {
    navigate(`/plan/${trace_code}`);
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;

    if (value.includes('all')) {
      setFilteredStatus(isAllSelected ? [] : statuses);
    } else {
      setFilteredStatus(value);
    }
  };

  const renderValue = (selected) => {
    if (selected.length === 0 || selected.includes('all')) {
      return 'همه وضعیت‌ها';
    }
    return selected.map(getStatusTitle).join(', ');
  };

  const isAllSelected = filteredStatus.length === statuses.length;

  const filteredPlans = planData
    .filter(
      (plan) =>
        filteredStatus.length === 0 ||
        filteredStatus.includes(plan.information_complete?.status_second)
    )
    .sort((a, b) => new Date(b.plan?.created_at) - new Date(a.plan?.created_at))
    .reverse();


  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <ToastContainer />
      <Box display="flex" alignItems="center" mb={4} gap={2}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <Select
            multiple
            value={isAllSelected ? ['all'] : filteredStatus}
            onChange={handleStatusChange}
            displayEmpty
            renderValue={renderValue}
            sx={{
              width: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
            IconComponent={FilterListIcon}
          >
            <MenuItem value="all">
              <Checkbox checked={isAllSelected} />
              <ListItemText primary="همه وضعیت‌ها" />
            </MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                <Checkbox checked={filteredStatus.includes(status)} />
                <ListItemText primary={getStatusTitle(status)} />
              </MenuItem>
            ))}
          </Select>
        </motion.div>

        <Button
          variant="outlined"
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#1976d2',
              color: '#fff',
              transform: 'scale(1.05)',
            },
            '&.MuiButton-root:active, &.Mui-focused': {
              borderColor: '#c2c2c2',
              backgroundColor: '#f5f5f5',
              color: '#c2c2c2',
            },
          }}
          onClick={handleLoadClick}
          startIcon={
            <motion.div
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ repeat: isRotating ? Infinity : 0, duration: 0.8 }}
            >
              <RefreshIcon />
            </motion.div>
          }
        >
          بارگذاری
        </Button>
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress color="primary" />
        </Box>
      )}

      {!isLoading && filteredPlans.length === 0 && (
        <Typography variant="h6" color="textSecondary" align="center">
          هیچ طرحی وجود ندارد
        </Typography>
      )}

      <Grid container spacing={2} alignItems="stretch">
        <AnimatePresence>
          {!isLoading &&
            filteredPlans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.plan?.trace_code}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                      padding: '16px',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                      },
                      borderRadius: '12px',
                      backgroundColor:
                        plan.information_complete?.status_second === '5' ? '#e0e0e0' : 'white',
                      opacity: plan.information_complete?.status_second === '5' ? 0.7 : 1,
                      position: 'relative',
                    }}
                    onClick={() => handleCardClick(plan.plan?.trace_code)}
                  >
                    <Box
                      sx={{ position: 'relative', textAlign: 'center', display: 'inline-block' }}
                    >
                      <img
                        src={
                          plan?.picture_plan?.picture
                            ? `${OnRun}/${plan?.picture_plan?.picture}`
                            : '/public/img/nopic.jpg'
                        }
                        alt={plan?.picture_plan?.picture ? 'تصویر پروژه' : 'تصویر موجود نیست'}
                        style={{
                          width: '800px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '8px',
                          display: 'block',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        }}
                      />

                      <Box
                        sx={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#abebc6',
                          width: '40px',
                          height: '40px',
                          borderRadius: 1,
                          boxShadow: 2,
                          fontWeight: 'bold',
                          color: '#333',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                        }}
                      >
                        {plan.information_complete?.rate_of_return || 0}%
                      </Box>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        position: 'absolute',
                        top: '95px',
                        right: '-30px',
                        backgroundColor:
                          statusColors[plan.information_complete?.status_second] ||
                          'rgba(0, 0, 0, 0.7)',
                        color: '#fff',
                        padding: '6px 55px',
                        borderRadius: '4px',
                        zIndex: 1,
                        fontWeight: 'bold',
                        transform: 'rotate(-45deg)',
                        transformOrigin: 'top right',
                      }}
                    >
                      {getStatusTitle(plan.information_complete?.status_second)}
                    </Typography>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#2c3e50' }}>
                        {plan.plan?.persoan_approved_symbol || 'بدون نام'}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 1,
                          color: '#7f8c8d',
                          fontStyle: 'italic',
                          minHeight: '60px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          lineClamp: 3,
                        }}
                      >
                        {plan.plan?.persian_name || 'بدون نام'}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
                        نام شرکت: <strong>{plan?.company[0]?.name || 'بدون نام'}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
                        مبلغ تعیین شده:{' '}
                        <strong>
                          {plan.plan?.total_price
                            ? `${formatNumber(plan.plan.total_price)} ریال`
                            : 'نامشخص'}
                        </strong>
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
                        تعداد واحدها:{' '}
                        <strong>
                          {plan.plan?.company_unit_counts
                            ? formatNumber(plan.plan.company_unit_counts)
                            : 'نامشخص'}
                        </strong>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
                        قیمت واحد:{' '}
                        <strong>
                          {plan.plan?.unit_price
                            ? `${formatNumber(plan.plan.unit_price)} ریال`
                            : 'نامشخص'}
                        </strong>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: '#34495e' }}>
                        صنعت: <strong>{plan.plan?.industry_group_description || 'نامشخص'}</strong>
                      </Typography>

                      <ProgressLineChart
                        label="تامین شده"
                        total_price={plan.plan?.total_price}
                        amount_collected_now={Math.round(
                          plan.information_complete?.amount_collected_now ?? 0
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
};

export default PlanTableFeature;
