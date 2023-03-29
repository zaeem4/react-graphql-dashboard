import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';

export const Authorized = () => {
  const token = localStorage.getItem('TOKEN');

  /* eslint-disable */
  if (token) {
    return <SidebarLayout />;
  } else {
    return <Navigate to="/login" />;
  }
  /* eslint-enable */
};
