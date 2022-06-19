import * as React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
} from '@mui/material'
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'

const Product = ({ product, orderItem, setOrderItem }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        height: 200
                    }}
                    image={`${process.env.REACT_APP_API_URL}/images/${product.image}`}
                    alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                </Typography>
                <Typography>
                    {product.description}
                </Typography>
                </CardContent>
                <CardActions>
                    {orderItem 
                        ? (
                            <>
                                <IconButton size="small" onClick={() => setOrderItem(product, { count: orderItem.count - 1 })}><Remove /></IconButton>
                                <Typography>{orderItem.count}</Typography>
                                <IconButton size="small" onClick={() => setOrderItem(product, { count: orderItem.count + 1 })}><Add /></IconButton>
                            </>
                        )
                        : (
                            <Button size="small" onClick={() => setOrderItem(product, { count: 1 })}>Добавить</Button>
                        )
                    }
                    <Typography sx={{ flex: '1 1 0', textAlign: 'right', mr: 2 }}>{product.price}₽</Typography>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Product
