import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Layout from '../components/Layout';
import { useAuthContext } from '../context/Auth.provider';

const Routing = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

const RequireAuth = ({ children }) => {
  let { isLoggedIn } = useAuthContext();
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Routing;
