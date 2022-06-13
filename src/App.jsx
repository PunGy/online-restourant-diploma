import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import { Container, Toolbar, Grid  } from '@mui/material'
import Basket from './components/Basket/Basket'
import useFetch from './network/useFetch'
import ProductsList from './components/Products/ProductsList'
import Account from './components/Account/Account'

const App = () => {
  const { data: user, fetchData: fetchUser } = useFetch()

  React.useEffect(() => {
    fetchUser(`/users/current`)
  }, [])

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item sx={{ ml: 2 }}>
              <Account account={user} />
            </Grid>
            <Grid item sx={{ mr: 2 }}>
              <Basket />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="lg">
          <ProductsList />
        </Container>
      </main>
    </div>
  )
}

export default App
