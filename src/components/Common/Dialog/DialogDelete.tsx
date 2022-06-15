import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import * as React from 'react';
import bannerApi from 'src/api/banner';
import categoriesApi from 'src/api/categoriesApi';
import collectionApi from 'src/api/collectionApi';
import faqApi from 'src/api/faqs';
import { AuthContext } from 'src/App';

interface DialogDeleteProps {
  title: string;
  id: string;
}
export default function DialogDelete({ title, id }: DialogDeleteProps) {
  const { handleChangeMessageToast, updateSuccess, handleOpenToast } =
    React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitAndClose = () => {
    switch (title) {
      case 'Categories':
        categoriesApi.deleteCategories(id).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          updateSuccess();
        });
        break;
      case 'banner':
        bannerApi.deleteBanner(id).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          updateSuccess();
        });
        break;
      case 'FAQs':
        faqApi.deleteFaq(id).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          updateSuccess();
        });
        break;
      case 'Special':
        collectionApi.deleteCollection(id).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          updateSuccess();
        });
        break;
      default:
        collectionApi.deleteCollection(id).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          updateSuccess();
        });
        break;
    }
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
