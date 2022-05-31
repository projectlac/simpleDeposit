import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, CssBaseline } from '@mui/material';
import jwt_decode from 'jwt-decode';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import './assets/styles/global.scss';
import Toast from './components/Common/Toast/Toast';
import routes from './router';
import ThemeProvider from './theme/ThemeProvider';

export const AuthContext = React.createContext(null);

const queryClient = new QueryClient();

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(
    Boolean(localStorage.getItem('access_token'))
  );

  const [updated, setUpdated] = useState<boolean>(false);

  const [openToast, setOpenToast] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');

  const handleOpenToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleChangeMessageToast = (msg: string) => {
    setMessage(msg);
  };

  const updateSuccess = () => {
    setUpdated(true);
    console.log('huhuhu');

    setTimeout(() => {
      setUpdated(false);
    }, 500);
  };

  const handleLoginIn = () => {
    setIsLogin(true);
  };

  const handleLoginOut = () => {
    setIsLogin(false);
  };

  const value = {
    isLogin,
    updated,
    updateSuccess,
    handleLoginIn,
    handleLoginOut,
    handleOpenToast,
    handleCloseToast,
    handleChangeMessageToast
  };

  const getRoleFromToken = () => {
    if (isLogin) {
      const token = localStorage.getItem('access_token');
      var decoded = jwt_decode(token) as any;
      if (decoded) return decoded.role;
    }
  };

  const content = useRoutes(
    routes(isLogin, getRoleFromToken()),
    `${process.env.REACT_APP_BASE_NAME}`
  );

  return (
    <AuthContext.Provider value={value}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Box>
              <Box>{content}</Box>
              <Toast
                open={openToast}
                message={message}
                onClose={handleCloseToast}
              />
            </Box>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
export default App;
