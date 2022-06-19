import * as React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem, Dialog, Snackbar, Alert } from '@mui/material';
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import useFetch from '../../network/useFetch'
import { isValue } from '../../helpers';

const Account = ({ account, reload }) => {
    const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
    const [anchorDialogEl, setAnchorDialogEl] = React.useState(null);
    const [form, setForm] = React.useState('login')
    const { fetchData: logout } = useFetch('/logout', { method: 'POST' })
    const isAuthorized = isValue(account)

    const [snackbarLogin, setSnackbarLogin] = React.useState(false)
    const [snackbarRegistration, setSnackbarRegistration] = React.useState(false)
    const [snackbarLogout, setSnackbarLogout] = React.useState(false)
  
    const handleMenu = (event) => {
      setAnchorMenuEl(event.currentTarget);
    };
    const handleDialog = (event) => {
      setAnchorDialogEl(event.currentTarget);
    }

    const performAction = (openSnackbar, toClose) => async (action) => {
      await action
      console.log(reload)
      await reload()
      if (openSnackbar) {
        openSnackbar()
      }
      if (toClose) {
        toClose()
      }
    }

    const handleOpen = (event) => {
      if (isAuthorized) {
        handleMenu(event);
      } else {
        handleDialog(event);
      }
    }
  
    const handleCloseMenu = () => {
      setAnchorMenuEl(null);
    };
    const handleCloseDialog = () => {
      setAnchorDialogEl(null);
    }

    const setLogin = () => {
      setForm('login')
    }
    const setRegistration = () => {
      setForm('registration')
    }

    return (
        <div>
            <IconButton onClick={handleOpen} sx={{ color: '#fff' }}>
                <AccountCircle fontSize="large" />
            </IconButton>
            {isAuthorized ? (
              <Menu
                id="account-menu"
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
                <MenuItem onClick={handleCloseMenu}>{account.full_name}</MenuItem>
                <MenuItem onClick={() => performAction(() => setSnackbarLogout(true), handleCloseMenu)(logout())}>Выйти</MenuItem>
              </Menu>
            ) : (
              <Dialog open={Boolean(anchorDialogEl)} onClose={handleCloseDialog}>
                {form === 'login' ? (
                  <LoginForm performAction={performAction(() => setSnackbarLogin(true), handleCloseDialog)} setRegistration={setRegistration} handleCloseDialog={handleCloseDialog} />
                ): (
                  <RegistrationForm performAction={performAction(() => setSnackbarRegistration(true), handleCloseDialog)} setLogin={setLogin} handleCloseDialog={handleCloseDialog} />
                )}
              </Dialog>
            )}
            <Snackbar
              open={snackbarLogin}
              autoHideDuration={5000}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                Вы успешно вошли в систему
              </Alert>
            </Snackbar>
            <Snackbar
              open={snackbarRegistration}
              autoHideDuration={5000}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                Вы успешно зарегистрировались в системе
              </Alert>
            </Snackbar>
            <Snackbar
              open={snackbarLogout}
              autoHideDuration={5000}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                Вы успешно вышли из системы
              </Alert>
            </Snackbar>
        </div>
    )
}

export default Account