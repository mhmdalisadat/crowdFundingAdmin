import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider , createTheme } from '@mui/material/styles';


import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});



root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
      <ThemeProvider theme={theme}>
        <Suspense>
          <App />
        </Suspense>
      </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);






