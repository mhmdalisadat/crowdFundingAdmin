/* eslint-disable import/no-extraneous-dependencies */

import { createTheme } from '@mui/material/styles';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useEffect, useState } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {
  useScrollToTop();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (window.self !== window.top) { 
      window.top.location = window.self.location;
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
