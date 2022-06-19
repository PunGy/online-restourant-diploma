import * as React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';

import Product from './Product'
import AddProduct from './AddProduct'
import useFetch from '../../network/useFetch';
import { useCallback } from 'react';
import { isError, isValue } from '../../helpers';

const ProductsList = ({ order, fetchOrder, user, fetchData, loading, data: products }) => {
    React.useEffect(() => {
        fetchData()
    }, [])

    const setOrderItem = useCallback((product, orderItem) => {
        if (isError(order)) {
            fetchOrder({
                method: 'POST',
                body: JSON.stringify({ products: { [product.id]: orderItem }})
            })
        } else if (orderItem.count === 0) {
            delete order.products[product.id]
            fetchOrder({
                url: `/order/${order.id}`,
                method: 'PATCH',
                body: JSON.stringify({ products: order.products })
            })
        } else {
            fetchOrder({
                url: `/order/${order.id}`,
                method: 'PATCH',
                body: JSON.stringify({ products: { ...order.products, [product.id]: orderItem }})
            })
        }
    }, [order])

    return (
        <Grid container spacing={3}>
            {loading ? <CircularProgress sx={{ margin: '100px auto' }} /> : (
                isValue(products) ? 
                    products.map(product => (
                        <Product key={product.id} product={product} setOrderItem={setOrderItem} orderItem={isValue(order) ? order.products[product.id] : null} />
                    ))
                : <Typography sx={{ margin: '100px auto' }}>Продуктов нет</Typography>
            )}
            {isValue(user) && user.role === 'admin' && <AddProduct reload={fetchData} />}
        </Grid>
    )
}

export default ProductsList;