import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function LoginMsg({open,handleClose}) {
    const navigate=useNavigate()
  function handleLogin(){
    handleClose()
    navigate('/signin')
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">please login to complete this action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleLogin} autoFocus>
            login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}