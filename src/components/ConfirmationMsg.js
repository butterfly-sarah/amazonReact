import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../reducers/order';

export default function ConfirmationMsg({open,handleClose,id}) {
    const dispatch=useDispatch()
    const user=useSelector(((state)=>state.user.user))
    const navigate=useNavigate()
  function handleOrder(){
    handleClose()
    dispatch(addOrder({user:user.id,product:id}))
    // navigate('/signin')
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
          <DialogContentText id="alert-dialog-description">do you want to add this item to cart
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleOrder} autoFocus variant='contained' color='success'>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}