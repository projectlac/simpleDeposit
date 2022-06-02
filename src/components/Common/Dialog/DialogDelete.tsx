import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface DialogDeleteProps {
  title: string;
  id: string;
}
export default function DialogDelete({ title, id }: DialogDeleteProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitAndClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DeleteForeverRoundedIcon onClick={handleClickOpen} color="error" />
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
            Are you sure complete this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={submitAndClose}
            type="submit"
            variant="outlined"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
