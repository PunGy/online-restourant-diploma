import * as React from 'react';
import { Badge, IconButton } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'

const Basket = () => {
    return (
        <IconButton sx={{ color: '#fff' }}>
            <Badge badgeContent={4} color="error">
                <ShoppingBasketIcon fontSize="large" />
            </Badge>
        </IconButton>
    )
}

export default Basket;