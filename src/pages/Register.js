import React, { useEffect } from 'react'
import { Box ,TextField,Grid,Button} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { error, info, success } from '../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../reducers/user';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate=useNavigate()
    const users=useSelector((state)=>state.user.users)
    console.log(users)
    const dispatch=useDispatch()
    const handleSubmit=(values)=>{
        if(values.password!==values.confirmPassword) return error("the password confirmation doesn't match")
        // console.log(values)
        let duplicated=users.some((user)=>user.email==values.email);
        if (duplicated) return error("email is already taken")
        dispatch(addUser(values))
        success("account created")
        setTimeout(()=>{navigate("/signin")},1000)
        
    
    }
    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        onSubmit: handleSubmit
      });
  return (
    <Box sx={{margin:"25vh auto",width:"50%"}}>
        <form onSubmit={formik.handleSubmit}>
            <Grid container  spacing={2}>

            <Grid childern item xs={6}>
            <TextField required id='outlined-required' label='First Name' type='text' name='firstName' fullWidth onChange={formik.handleChange}
            value={formik.values.firstName}/>
            </Grid>

            <Grid childern item xs={6}>
            <TextField required id='outlined-required' label='Last Name' type='text' name='lastName' fullWidth onChange={formik.handleChange}
            value={formik.values.lastName}/>
            </Grid>

            <Grid childern item xs={12}>
            <TextField required id='outlined-required' label='Email Address' type='email' name='email' fullWidth onChange={formik.handleChange}
            value={formik.values.email}/>
            </Grid>

            <Grid childern item xs={6}>
            <TextField required id='outlined-required' label='Password' type='password' name='password' fullWidth onChange={formik.handleChange}
            value={formik.values.password}/>
            </Grid>

            <Grid childern item xs={6}>
            <TextField required id='outlined-required' label='Confirm Password' type='password' name='confirmPassword'fullWidth onChange={formik.handleChange}
            value={formik.values.confirmPassword}/>
            </Grid>

            <Grid childern item xs={12}>
            <Button variant='contained' color='success' type='submit' sx={{display:'block',margin:"auto"}}>submit</Button>
            </Grid>

            </Grid>
        </form>
    </Box>
  )
}

export default Register
