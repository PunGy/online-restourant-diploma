import * as React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material'

const Product = ({ product }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        pt: '56.25%',
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
                    <Button size="small" buttontype="add_to_basket" productid={product.id}>Добавить</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Product
