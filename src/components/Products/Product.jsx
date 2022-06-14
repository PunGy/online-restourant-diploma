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

const Product = ({ product, orderItem }) => {
    return (
        <Grid item xs={12} sm={6} md={4} onClick={(event) => event.product = product}>
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
                                <IconButton size="small" onClick={(event) => event.buttontype = 'decrement_count'}><Remove /></IconButton>
                                <Typography>{orderItem.count}</Typography>
                                <IconButton size="small" onClick={(event) => event.buttontype = 'increment_count'}><Add /></IconButton>
                            </>
                        )
                        : (
                            <Button size="small" onClick={(event) => event.buttontype = 'add_to_basket'}>Добавить</Button>
                        )
                    }
                    
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Product
