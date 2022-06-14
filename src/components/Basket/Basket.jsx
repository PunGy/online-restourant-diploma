import * as React from 'react';
import { Badge, IconButton } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const Basket = ({ order }) => {
    return (
        <IconButton sx={{ color: '#fff' }}>
            <Badge badgeContent={order == null ? 0 : Object.values(order.products).reduce((acc, x) => acc + x.count, 0)} color="error">
                <ShoppingBasketIcon fontSize="large" />
            </Badge>
        </IconButton>
    )
}

export default Basket;