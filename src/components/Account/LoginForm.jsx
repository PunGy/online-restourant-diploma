import * as React from 'react';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Typography } from '@mui/material';
import useFetch from '../../network/useFetch';

const LoginForm = ({ handleCloseDialog, setRegistration }) => {
    const {fetchData: sendLogin} = useFetch()

    const login = React.useCallback(async () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        await sendLogin('/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }) 
        })
        handleCloseDialog()
    }, [])

    return (
        <>
        <DialogTitle>Логин</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Войдите, чтобы иметь возможность делать заказы
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email адрес"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Пароль"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Typography onClick={setRegistration} sx={{ flex: '1 1 0', cursor: 'pointer', textDecoration: 'underline' }} color="primary">Регистрация</Typography>
                <Button onClick={handleCloseDialog}>Отмена</Button>
                <Button onClick={login}>Войти</Button>
            </DialogActions>
           
        </>
    )
}

export default LoginForm;