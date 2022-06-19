import * as React from 'react';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Typography, Grid } from '@mui/material';
import useFetch from '../../network/useFetch';
import Form from './Form'

const LoginForm = ({ handleCloseDialog, setRegistration }) => {
    const {fetchData: sendLogin} = useFetch()

    const login = React.useCallback(async () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        await sendLogin({
            url: '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }) 
        })
        handleCloseDialog()
    }, [])

    return (
        <Form
            handleCloseDialog={handleCloseDialog}
            title="Логин"
            description="Введите ваш email и пароль"
            onSubmit={login}
            submitAction="Войти"
            changeForm={setRegistration}
            changeFormAction="Регистрация"
        >
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
        </Form>
    )
}

export default LoginForm;