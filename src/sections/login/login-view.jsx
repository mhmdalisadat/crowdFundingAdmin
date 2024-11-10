/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { setCookie, getCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);
  const [encrypted_response, setEncrypted_response] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [registerd, setRegisterd] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessApi = getCookie('accessApi');

  const getCaptcha = () => {
    axios
      .get(`${OnRun}/api/captcha/`)
      .then((response) => {
        setEncrypted_response(response.data.captcha.encrypted_response);
        setCaptchaImage(response.data.captcha.image);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (accessApi) {
      router.push('/');
    }
  });

  const applyNationalCode = () => {
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length !== 10) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      setLoading(true);
      axios({
        method: 'POST',
        url: `${OnRun}/api/otp/admin/`,
        data: {
          uniqueIdentifier: nationalCode,
          encrypted_response,
          captcha: captchaInput,
        },
      })
        .then((response) => {
          toast.success(response.data.message);
          setRegisterd(response.data.registered);
          setStep(2);
        })
        .catch((error) => {
          console.error('خطا:', error);
          toast.error('خطا در ارسال درخواست به سرور.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCode = () => {
    if (otp.length !== 5) {
      toast.warning('کد صحیح نیست');
    } else {
      setLoading(true);
      axios({
        method: 'POST',
        url: `${OnRun}/api/login/admin/`,
        data: { uniqueIdentifier: nationalCode, code: otp },
      })
        .then((response) => {
          setCookie('accessApi', response.data.access, 5);
          toast.success('ورود با موفقیت انجام شد');
          if (registerd) {
            router.push('/');
          } else {
            router.push('/ProfilePage');
          }
          toast.warning(response.data.message);
  
     
        })
        .catch((error) => {
          if (error.response?.status === 400) {
            toast.error('دسترسی شما محدود شده است. بازگشت به صفحه اصلی');
            setTimeout(() => {
              window.location.reload();
            }, 3000); 
          } else {
            toast.error(error.response?.data?.message || 'خطا در ورود');
            setTimeout(() => {
              window.location.reload();
            }, 3000); 
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  
  

  useEffect(getCaptcha, []);

  const renderForm = (
    <>
      <ToastContainer autoClose={3000} />
      <Stack spacing={3} sx={{ mb: 3 }}>
        <TextField
          autoComplete="off"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          label="شناسه ملی"
        />

        {step === 1 ? (
          <>
            <TextField
              autoComplete="off"
              onChange={(e) => setCaptchaInput(e.target.value)}
              label="کپچا"
              value={captchaInput}
            />
            <Button onClick={getCaptcha}>
              <img src={`data:image/png;base64,${captchaImage}`} alt="captcha" />
            </Button>
            <Box sx={{ mb: 3 }} />
          </>
        ) : (
          <TextField value={otp} onChange={(e) => setOtp(e.target.value)} label="کد تایید" />
        )}
      </Stack>

      {step === 1 ? (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          onClick={applyNationalCode}
          loading={loading}
        >
          تایید
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleCode}
          loading={loading}
        >
          تایید
        </LoadingButton>
      )}
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            ایساتیس کراد
          </Typography>
          <Typography
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
            variant="h6"
          >
            درگاه ورود مدیریت ایساتیس کراد
          </Typography>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ورود
            </Typography>
          </Divider>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
