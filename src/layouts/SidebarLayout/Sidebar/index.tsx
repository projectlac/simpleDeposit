import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SidebarContext } from 'src/contexts/SidebarContext';
import Logo from 'src/components/Logo';

import { Box, Drawer, Hidden, Typography } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
      
        color: ${theme.sidebar.textColor};
        
        background: ${theme.sidebar.background};
        background: #fff;
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        transition: all 0.3s ease-in-out;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position: fixed;
            z-index: 10;
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);
const BottomSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 65px;
        align-items: center;
        justify-content:flex-start;
        color: ${theme.palette.primary.main};
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-top: ${theme.sidebar.dividerBg} solid 1px;
        bottom: 0;
        margin:0;
        padding: 15px 22px;
        position: absolute;
        width: 100%;
`
);
function Sidebar() {
  const { sidebarToggle, toggleLocal, localToggle, toggleSidebar } =
    useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();

  return (
    <>
      <Hidden lgDown>
        <SidebarWrapper width={localToggle ? '80px' : '280px'}>
          <Scrollbars autoHide>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu />

            <BottomSection onClick={toggleLocal} style={{ cursor: 'pointer' }}>
              <KeyboardArrowLeftRoundedIcon
                color="primary"
                style={{
                  transition: 'all 0.3s ease-in-out',
                  transform: `scale(1.8) ${
                    localToggle ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
                  } `,
                  marginRight: `${localToggle ? '' : '15px'}`
                }}
              />
              {localToggle ? (
                ''
              ) : (
                <Typography variant="h4" fontWeight="normal" fontSize={18}>
                  Collapse sidebar
                </Typography>
              )}
            </BottomSection>
          </Scrollbars>
        </SidebarWrapper>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggle}
          onClose={closeSidebar}
          variant="temporary"
          elevation={9}
          sx={{
            '& .MuiDrawer-paper': { width: `${sidebarToggle ? '280px' : '0'}` }
          }}
        >
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Logo />
              </TopSection>
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
