import { CssBaseline } from '@mui/material';
import { useAuthContext } from './context/Auth.provider';
import Routing from './pages/Routing';

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <CssBaseline />
      <Routing isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
