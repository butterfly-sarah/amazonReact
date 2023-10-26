import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import defaultImg from '../assests/default.png'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';
import { error, success } from '../components/Toast';
const Profile = () => {
  const user=useSelector((state)=>state.user.user)
  const users=useSelector((state)=>state.user.users)
  const imageInput=useRef()
  const [image,setImage]=useState(null)
  const formik = useFormik({
    initialValues: user,
    onSubmit: handleSubmit
  });
  const dispatch=useDispatch()
  function handleSubmit(values){
    let dupEmails=users.find((ele)=>ele.email==values.email&&values.id!=ele.id)
    if(dupEmails){return error("email is already taken")}
    if(values.password!=values.confirmPassword){return error("confiremd password is wrong")}
    dispatch(updateUser(values))
    success("data is updated successfully")
    console.log(users)
  }
  function imageUpload(){
    imageInput.current.click()
  }
  function imageDisplay(e){
    let file=e.target.files[0]
    setImage(file)
    
  }
  return (
    <>
      <Box width={"55%"} style={{margin:"10vh auto"}}>
            <form onSubmit={formik.handleSubmit}>
            <Grid container  spacing={2}>
            <Grid  item xs={12}>
            <img src={(image && URL.createObjectURL(image)) || defaultImg} style={{width:"120px",height:"120px",display:"block",margin:"5vh auto",borderRadius:"50%",boxShadow:"1px 1px 10px black"}}/>
            <Button onClick={imageUpload} variant='contained' size='small' style={{display:"block",margin:"auto"}}>change profile picture</Button>
            <input onChange={imageDisplay} type='file' ref={imageInput}  style={{display:"none"}}/>
            </Grid>

            <Grid  item xs={6}>
            <TextField required id='outlined-required' label='First Name' type='text' name='firstName' fullWidth 
            value={formik.values.firstName} onChange={formik.handleChange}/>
            </Grid>

            <Grid  item xs={6}>
            <TextField required id='outlined-required' label='Last Name' type='text' name='lastName' fullWidth 
            value={formik.values.lastName} onChange={formik.handleChange}/>
            </Grid>

            <Grid  item xs={12}>
            <TextField required id='outlined-required' label='Email Address' type='email' name='email' fullWidth 
            value={formik.values.email} onChange={formik.handleChange}/>
            </Grid>

            <Grid  item xs={6}>
            <TextField required id='outlined-required' label='Password' type='password' name='password' fullWidth 
            value={formik.values.password} onChange={formik.handleChange}/>
            </Grid>

            <Grid  item xs={6}>
            <TextField required id='outlined-required' label='Confirm Password' type='password' name='confirmPassword'fullWidth 
            value={formik.values.confirmPassword} onChange={formik.handleChange}/>
            </Grid>

            <Grid childern item xs={12}>
            <Button variant='contained' color='success' type='submit' sx={{display:'block',margin:"auto"}}>save changes</Button>
            </Grid>

            </Grid>
            </form>
            
      </Box>
    </>
  )
}

export default Profile
