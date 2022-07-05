import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/Auth.provider.js';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import MainContainer from '../components/MainContainer.jsx';
import AppForm from '../components/AppForm.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { logIn, isLoggedIn, isLoading } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const from = location.state?.from?.pathname ?? '/';
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, location, navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onUsernameChange(e) {
    setUsername(e.currentTarget.value);
  }

  function onPasswordChange(e) {
    setPassword(e.currentTarget.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    logIn({ username, password });
  }

  return (
    <MainContainer>
      <FormContainer>
        <AppForm>
          <Typography variant="h5" alignContent="center">
            Log in
          </Typography>
          <Box
            component="form"
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              rowGap: '20px',
            }}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <TextField
              value={username}
              onChange={onUsernameChange}
              required
              label="Username"
            />
            <TextField
              value={password}
              onChange={onPasswordChange}
              required
              label="Password"
              type="password"
            />
            <LoadingButton
              type="submit"
              loading={isLoading}
              sx={{ mt: 3, width: 1 }}
              variant="contained"
            >
              Log in
            </LoadingButton>
          </Box>
        </AppForm>
      </FormContainer>
    </MainContainer>
  );
};

const FormContainer = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  alignContent: 'center',
  justifyContent: 'center',
  maxWidth: 500,
}));

export default Login;
