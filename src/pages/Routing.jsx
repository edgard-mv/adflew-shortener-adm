import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Layout from '../components/Layout';

const Routing = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
