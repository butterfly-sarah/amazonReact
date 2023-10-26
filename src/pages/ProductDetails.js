import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../reducers/products'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Loading from '../components/Loading';
const ProductDetails = () => {
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(true)
    const product=useSelector((state)=>state.products.product)
    console.log(product)
    let {id}=useParams()
    useEffect(()=>{
        dispatch(fetchProduct(id))
        setTimeout(()=>setLoading(false),1000)
    },[])
    
  return (
    <>
    {
        loading?<Loading/>:
    <Card sx={{ maxWidth: 745 ,margin:"5vh auto 0"}}>
    <CardMedia
      component="img"
      alt="green iguana"
      image={product.image} style={{width:"25%",margin:"auto"}}/>
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {product.title}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        {product.price} $
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.category}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </CardContent>
    <CardActions>
      
    </CardActions>
  </Card>}
      
    </>
  )
}

export default ProductDetails
