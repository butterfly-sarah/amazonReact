import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory, fetchProducts } from '../reducers/products'
import { Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {TextField,Select,MenuItem}  from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import LoginMsg from '../components/LoginMsg';
import ConfirmationMsg from '../components/ConfirmationMsg';
import { Functions } from '@mui/icons-material';

const Home = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const products=useSelector((state)=>state.products.all)
  const online=useSelector((state)=>state.user.online)
  const user=useSelector((state)=>state.user.user)
  const orders=useSelector((state)=>state.order.orders)
  const categories=useSelector((state)=>state.products.categories)
  const[orderId,setOrderId]=useState()
  const [category,setCategory]=useState("")
  const [search,setSearch]=useState("")
  const [loginOpen,setLoginOpen]=useState(false)
  const [confirmOpen,setConfirmOpen]=useState(false)
  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchCategory())
  },[])
  let DisplayedData=products
  if(category){
    DisplayedData=DisplayedData.filter((el)=>el?.category?.includes(category))
  }
  if(search){
    DisplayedData=DisplayedData.filter((el)=>el?.title?.includes(search)||el?.price?.toString().startsWith(search))
  }
  function handleClose(){
    setLoginOpen(false)
    setConfirmOpen(false)
    setOrderId(null)
  }
  function handleOrder(id){
    if(online){
      setOrderId(id)
      setConfirmOpen(true)
    }
    else{
      setLoginOpen(true)
    }
  }
  function checkProduct(id){
    let userId=user.id
    let ordered=orders.some((item)=>item.user==userId&&item.product==id)
    return ordered
  }
  return (
    <>
          <Stack direction="row" spacing={2} sx={{width:{md:"60%" ,xs:"80%"},margin:"5vh auto"}}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          fullWidth
          onChange={(e)=>setCategory(e.target.value)}
          ><MenuItem value="">
          <em>None</em>
        </MenuItem>{categories.map((ele,ind)=>(
            <MenuItem key={ind} value={ele}>{ele}</MenuItem>
          ))}
          </Select>
          </FormControl>
          <TextField fullWidth id="outlined-basic" label="Search" variant="outlined" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </Stack>
    <Grid container spacing={2} sx={{width:"75%",margin:"5vh auto"}}>
      {
        DisplayedData.map((item,index)=>(
          <Grid key={index} item lg={3} md={4} sm={6} >
                    <Card sx={{ maxWidth: 345 ,height:450}} style={{position:"relative"}}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="220"
                image={item.image}
              style={{width:"60%",margin:"auto"}}/>
              <CardContent>
                <Typography gutterBottom variant="p" component="div">
                  {item.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item.price} $
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
              </CardContent>
              <CardActions style={{position:"absolute",bottom:"15px",left:"10%",transform:"translateX('-50%')"}}>
                <Button size="small" variant='contained' color='warning'><Link to={`/product/${item.id}`} style={{textDecoration:"none",color:"white"}}>details</Link></Button>
                <Button size="small" variant='contained' disabled={checkProduct(item.id)} color='success' onClick={()=>handleOrder(item.id)}>add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      
      }
    </Grid>
    <LoginMsg open={loginOpen} handleClose={handleClose}/>
    <ConfirmationMsg open={confirmOpen} handleClose={handleClose} id={orderId}/>
    </>
  )
}

export default Home
