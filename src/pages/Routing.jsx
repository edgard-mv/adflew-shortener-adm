import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';

const Routing = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? <Route path="/" element={<Login />} /> : <></>}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
