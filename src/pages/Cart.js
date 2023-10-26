import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
  const products=useSelector((state)=>state.products.all)
  const user=useSelector((state)=>state.user.user)
  const orders=useSelector((state)=>state.order.orders)
  const myOrders=orders.filter((ele)=>ele?.user==user.id)
  const productsIds=myOrders.map((ele)=>ele.product)
  const DisplayedData=products.filter((product)=>productsIds.includes(product.id))

  return (
    <>
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
                
              </CardActions>
            </Card>
          </Grid>
        ))
      
      }
    </Grid>
    </>
  )
}

export default Cart
