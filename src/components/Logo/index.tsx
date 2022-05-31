import { Box, Hidden, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// import logo from '../../assets/images/logo/Image 9.png';
const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};width: 100%
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};width: 100%;
      
`
);

function Logo() {
  return (
    <LogoWrapper to={`${process.env.REACT_APP_BASE_NAME}`}>
      <Hidden smDown>
        <LogoTextWrapper>
          <Box
            sx={{
              height: { lg: '88px', sm: '88px' },
              display: 'flex',
              width: '100%',
              alignItems: 'center'
            }}
          >
            {/* <img src={logo} alt="" width={'auto'} height={`88px`} /> */}
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Deposit Microsite CMS
            </Typography>
          </Box>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
