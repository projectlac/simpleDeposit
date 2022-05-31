import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import * as React from 'react';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#5E738F'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#5E738F'
  }
}));
export default BootstrapTooltip;
