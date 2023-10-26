import React, { useEffect } from 'react'
import { Box ,TextField,Grid,Button} from '@mui/material';
import { Formik, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { error, info, success } from '../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, login } from '../reducers/user';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate=useNavigate()
    const users=useSelector((state)=>state.user.users)
    console.log(users)
    const dispatch=useDispatch()
    const handleSubmit=({email,password})=>{
        console.log(email,password)
        const user=users.find((ele)=>ele.email==email)
        console.log(user)
        if(!user){
            return error("incorrect email")
        }
        const validpass=user.password===password
        if(!validpass){
            return error("incorrect password")
        }
        dispatch(login(user))
        success(`welcome ${user?.firstName}`)
        setTimeout(()=>{navigate("/")},1000)
    }
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: handleSubmit
      });
  return (
        <Box sx={{margin:"25vh auto",width:"50%"}}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container  spacing={2}>
    
                <Grid childern item xs={12}>
                <TextField required id='outlined-required' label='Email Address' type='email' name='email' fullWidth onChange={formik.handleChange}
                value={formik.values.email}/>
                </Grid>
    
                <Grid childern item xs={12}>
                <TextField required id='outlined-required' label='Password' type='password' name='password' fullWidth onChange={formik.handleChange}
                value={formik.values.password}/>
                </Grid>
    
                <Grid childern item xs={12}>
                <Button variant='contained' color='success' type='submit' sx={{display:'block',margin:"auto"}}>login</Button>
                </Grid>
    
                </Grid>
            </form>
        </Box>
      )
    }

export default Signin

