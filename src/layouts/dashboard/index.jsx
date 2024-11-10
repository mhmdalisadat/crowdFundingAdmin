import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import ScrollToTopButton from 'src/components/scrollBtn';
import Nav from './nav';
import Main from './main';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav  openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
        <ScrollToTopButton/>
      </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
