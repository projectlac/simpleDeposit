import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { Box, Button, Hidden, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import jwt_decode from 'jwt-decode';
import { useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import userApi from 'src/api/userApi';
import { AuthContext } from 'src/App';
const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: normal;
        font-size:16px;
        color: ${theme.palette.primary.main};
        display: block;
`
);

function HeaderUserbox() {
  const { handleLoginOut } = useContext(AuthContext);

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const nav = useNavigate();
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSignOut = () => {
    userApi.logOut().then((res) => {
      if (res.data.success) {
        localStorage.removeItem('access_token');
        handleLoginOut();
        if (!Boolean(localStorage.removeItem('access_token'))) {
          nav(`${process.env.REACT_APP_BASE_NAME}`);
        }
      }
    });
  };
  const token = localStorage.getItem('access_token');
  const getUserNameFromToken = useMemo(() => {
    var decoded = jwt_decode(token) as any;

    if (decoded) return decoded.email;
  }, [token]);

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body2">
              Hello, {getUserNameFromToken}
            </UserBoxLabel>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ArrowDropDownIcon sx={{ ml: 1 }} color="primary" />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <UserBoxText>
            <UserBoxLabel variant="body2">
              <span
                style={{
                  color: 'rgb(182, 186, 207)',
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              >
                User:{' '}
              </span>
              <b>{getUserNameFromToken}</b>
            </UserBoxLabel>
          </UserBoxText>
        </MenuUserBox>
        {/* <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/management/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            to="/dashboards/messenger"
            component={NavLink}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>
          <ListItem
            button
            to="/management/profile/settings"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider /> */}
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleSignOut}
            sx={{
              fontWeight: 500,
              background: '#044b7e',
              color: '#fff',
              '&:hover': {
                background: '#00355c'
              }
            }}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
