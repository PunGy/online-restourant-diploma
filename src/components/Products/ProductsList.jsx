import * as React from 'react';
import { CircularProgress, Grid } from '@mui/material';

import Product from './Product'
import useFetch from '../../network/useFetch';

const ProductsList = () => {
    const { data: products, loading, fetchData } = useFetch();

    React.useEffect(() => {
        fetchData(`/products`)
    }, [])

    return (
        <Grid container spacing={3} onClick={(event) => {
            const { target } = event;
            const buttonType = target.getAttribute('buttontype');
            if (buttonType === 'add_to_basket') {
                const productId = target.getAttribute('productid');
                console.log('id to add', productId)
                // fetchData(`/order/add/${productId}`)
            }
        }}>
            {loading ? <CircularProgress /> : (
                products.map(product => (
                    <Product key={product.id} product={product} />
                ))
            )}
        </Grid>
    )
}

export default ProductsList;