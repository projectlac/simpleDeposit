import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';
import { Divider } from '@mui/material';

interface DialogBackProps {
  link: string;
  title: string;
}
export default function DialogBack({ link, title }: DialogBackProps) {
  const [open, setOpen] = React.useState(false);

  const nav = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    nav(`${link}`);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mr: 2 }}>
        {title}
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
            Are you sure you want to take this action?
            <br />
            <span> All previous operations will be cancelled!</span>
          </DialogContentText>
        </DialogContent>
        <Divider></Divider>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Disagree
          </Button>
          <Button variant="outlined" onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
