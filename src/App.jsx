import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import { Container, Toolbar, Grid  } from '@mui/material'
import Basket from './components/Basket/Basket'
import useFetch from './network/useFetch'
import ProductsList from './components/Products/ProductsList'
import Account from './components/Account/Account'
import { useCallback } from 'react'
import { isValue } from './helpers'

const App = () => {
  const { data: user, fetchData: fetchUser } = useFetch('/users/current')
  const { data: order, fetchData: fetchOrder } = useFetch('/order')
  const productsData = useFetch('/products');


  const reload = useCallback(
    () => Promise.allSettled([
      fetchUser(),
      fetchOrder(),
    ]), []
  )

  React.useEffect(() => {
    reload()
  }, [])

  return (
    <div>
      <AppBar position="relative" sx={{ mb: 2 }}>
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item sx={{ ml: 2 }}>
              <Account reload={reload} account={user} />
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Basket fetchOrder={fetchOrder} products={isValue(productsData) ? productsData.data : null} order={order} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="lg">
          <ProductsList {...productsData} user={user} order={order} fetchOrder={fetchOrder} />
        </Container>
      </main>
    </div>
  )
}

export default App
