import * as React from 'react';
import { Badge, IconButton, Grid, Menu, MenuItem, Typography, Button, Snackbar, Alert } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { isValue } from '../../helpers';
import fetcher from '../../network/fetcher';

const Basket = ({ order, products, fetchOrder }) => {
    const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState(false)

    const handleCloseMenu = () => {
        setAnchorMenuEl(null);
    };
    const handleOpenMenu = (event) => {
        setAnchorMenuEl(event.currentTarget);
    };
    const orderProducts = products && isValue(order) && products.filter(product => product.id in order.products)

    const submitOrder = async () => {
        await fetcher(`/order/${order.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'finished' })
        })
        await fetchOrder()
        setSnackbar(true)
    }

    return (
        <Grid>
            <Menu
                id="basket-menu"
                anchorEl={anchorMenuEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorMenuEl)}
                onClose={handleCloseMenu}
              >
                {orderProducts 
                    ?
                        orderProducts
                            .map(product => {
                                const orderItem = order.products[product.id]
                                return (
                                    <MenuItem key={product.id}>
                                        <Typography mr={4}>{product.title}</Typography>
                                        <Typography>x{orderItem.count}</Typography>
                                        <Typography ml={4}>{orderItem.count * product.price}₽</Typography>
                                    </MenuItem>
                                )
                            })
                    : <MenuItem onClick={handleCloseMenu}>Пусто</MenuItem>
                }
                { orderProducts && <MenuItem><Button onClick={submitOrder}>Оформить заказ</Button></MenuItem> }
            </Menu>
            <IconButton sx={{ color: '#fff' }} onClick={handleOpenMenu}>
                <Badge 
                    badgeContent={
                        isValue(order) 
                            ? Object.values(order.products).reduce((acc, x) => acc + x.count, 0)
                            : 0
                    }
                    color="error"
                >
                    <ShoppingBasketIcon fontSize="large" />
                </Badge>
            </IconButton>
            <Snackbar
              open={snackbar}
              autoHideDuration={5000}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                Ваш заказ оформлен! Номер заказа: {Math.floor(Math.random() * 100)}
              </Alert>
            </Snackbar>
        </Grid>
    )
}

export default Basket;