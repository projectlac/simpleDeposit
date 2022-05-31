import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

interface DialogConfirmProps {
  disabled: boolean;
  title: string;
  fileName?: string;
  handleSubmit?: () => void;
}
export default function DialogConfirm({
  disabled,
  fileName,
  title,
  handleSubmit
}: DialogConfirmProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitAndClose = () => {
    handleSubmit();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} disabled={disabled}>
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        sx={{
          textAlign: 'center'
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: 'bold',
            fontSize: '17px',
            color: '#000'
          }}
        >
          {title}
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontWeight: 'bold',
              fontSize: '17px',
              color: '#000',
              '& span': {
                textDecoration: 'underline',
                color: 'rgba(4, 75, 126, 0.7)'
              }
            }}
          >
            Are use sure pushlist <span>{fileName}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Disagree
          </Button>
          <Button
            onClick={submitAndClose}
            type="submit"
            variant="contained"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
