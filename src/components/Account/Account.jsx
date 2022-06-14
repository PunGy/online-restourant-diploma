import * as React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem, Dialog } from '@mui/material';
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'


const Account = ({ account }) => {
    const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
    const [anchorDialogEl, setAnchorDialogEl] = React.useState(null);
    const [form, setForm] = React.useState('login')
    const isAuthorized = account && account.error == null
  
    const handleMenu = (event) => {
      setAnchorMenuEl(event.currentTarget);
    };
    const handleDialog = (event) => {
      setAnchorDialogEl(event.currentTarget);
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
              </Menu>
            ) : (
              <Dialog open={Boolean(anchorDialogEl)} onClose={handleCloseDialog}>
                {form === 'login' ? (
                  <LoginForm setRegistration={setRegistration} handleCloseDialog={handleCloseDialog} />
                ): (
                  <RegistrationForm setLogin={setLogin} handleCloseDialog={handleCloseDialog} />
                )}
              </Dialog>
            )}
            
        </div>
    )
}

export default Account