import * as React from 'react';
import { CircularProgress, Grid } from '@mui/material';

import Product from './Product'
import useFetch from '../../network/useFetch';

const ProductsList = ({ order, fetchOrder }) => {
    const { data: products, loading, fetchData } = useFetch('/products');

    React.useEffect(() => {
        fetchData()
    }, [])
    console.log(order)

    const handleClick = React.useCallback(async (event) => {
        const { product, buttontype: buttonType } = event;

        if (buttonType === 'add_to_basket') {
            fetchOrder('/order', {
                method: 'POST',
                body: JSON.stringify({ [product.id]: { count: 1 } })
            })
        } else if (buttonType === 'increment_count') {
            fetchOrder('/order', {
                method: 'POST',
                body: JSON.stringify({ [product.id]: { count: order.products[product.id].count + 1 } })
            })
        } else if (buttonType === 'decrement_count') {
            fetchOrder('/order', {
                method: 'POST',
                body: JSON.stringify({ [product.id]: { count: order.products[product.id].count - 1 } })
            })
        }
    }, [order])

    console.log(order)
    return (
        <Grid container spacing={3} onClick={handleClick}>
            {loading ? <CircularProgress /> : (
                products.map(product => (
                    <Product key={product.id} product={product} orderItem={order && order.products[product.id]} />
                ))
            )}
        </Grid>
    )
}

export default ProductsList;