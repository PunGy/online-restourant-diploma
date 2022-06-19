import * as React from 'react';
import { CircularProgress, Grid } from '@mui/material';

import Product from './Product'
import useFetch from '../../network/useFetch';
import { useCallback } from 'react';
import { isError, isValue } from '../../helpers';

const ProductsList = ({ order, fetchOrder }) => {
    const { data: products, loading, fetchData } = useFetch('/products');

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
            {loading ? <CircularProgress /> : (
                products.map(product => (
                    <Product key={product.id} product={product} setOrderItem={setOrderItem} orderItem={isValue(order) && order.products[product.id]} />
                ))
            )}
        </Grid>
    )
}

export default ProductsList;