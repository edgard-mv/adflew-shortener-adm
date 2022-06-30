import { Outlet } from 'react-router-dom';
import MainContainer from './MainContainer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../context/Auth.provider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const { isLoggedIn, logOut, userInfo } = useAuthContext();
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box
            sx={{
              display: 'inline-flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5">Adflew URL Shortener</Typography>
            {isLoggedIn && (
              <Box display="inline-flex" alignItems="center" columnGap="10px">
                {userInfo?.username && (
                  <Typography variant="body1">{userInfo?.username}</Typography>
                )}
                <IconButton onClick={logOut}>
                  <LogoutRounded />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <MainContainer>
        <Outlet />
        <ToastContainer position="bottom-right" />
      </MainContainer>
    </>
  );
};

export default Layout;
