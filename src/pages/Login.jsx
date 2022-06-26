import { useState } from 'react';
import { useAuthContext } from '../context/Auth.provider.js';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MainContainer from '../components/MainContainer.jsx';
import AppForm from '../components/AppForm.jsx';

const Login = () => {
  const { logIn } = useAuthContext();

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
            helperText="It must contain at least 6 characters"
          />
          <Button type="submit" sx={{ mt: 3, width: 1 }} variant="contained">
            Log in
          </Button>
        </Box>
      </AppForm>
    </MainContainer>
  );
};

export default Login;
