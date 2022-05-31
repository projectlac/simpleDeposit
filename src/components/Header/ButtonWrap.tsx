import { Box, styled } from '@mui/material';

const ButtonWrap = styled(Box)(
  ({ theme }) => `
          padding: ${theme.spacing(4, 2)};
          text-align:right;
          display:flex;
          justify-content:flex-end;
  `
);
export default ButtonWrap;
