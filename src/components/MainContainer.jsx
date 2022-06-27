import { styled } from '@mui/material/styles';

const MainContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flex: '1 1 auto',
  alignContent: 'center',
  justifyContent: 'center',
  width: '100%',
}));

export default MainContainer;
