import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import history from './utils/history';

const CustomRouter = ({ basename, children, history }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router children={children} location={state.location} navigator={history} />
  );
};

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <CustomRouter
        history={history}
        basename={process.env.REACT_APP_BASE_NAME}
      >
        <App />
      </CustomRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
