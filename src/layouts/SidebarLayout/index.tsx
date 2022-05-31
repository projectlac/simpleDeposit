import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, ReactNode, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import StatusMaintenance from 'src/content/pages/Status/Maintenance';
import { SidebarContext } from 'src/contexts/SidebarContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        background: #fff;
        // @media (min-width: ${theme.breakpoints.values.lg}px) {
        //     padding-left: ${theme.sidebar.width};
        // }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const { localToggle } = useContext(SidebarContext);
  return (
    <>
      <Header />
      {process.env.REACT_APP_MAINTENANCE_MODE === 'true' ? (
        <StatusMaintenance />
      ) : (
        <>
          <Sidebar />
          <MainWrapper
            sx={{
              transition: 'all 0.3s',
              paddingLeft: {
                lg: `${localToggle ? '100px' : '280px'}`
              }
            }}
          >
            <MainContent>
              <Outlet />
            </MainContent>
          </MainWrapper>
        </>
      )}
    </>
  );
};

export default SidebarLayout;
