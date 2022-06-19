import * as React from 'react';
import { TextField } from '@mui/material';
import Form from './Form'
import useFetch from '../../network/useFetch';

const RegistrationForm = ({ handleCloseDialog, performAction, setLogin }) => {
    const {fetchData: sendRegistrate} = useFetch()

    const registrate = React.useCallback(async () => {
        const email = document.getElementById('email').value
        const fullName = document.getElementById('full-name').value
        const password = document.getElementById('password').value
        performAction(sendRegistrate({
            url: '/registration', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, full_name: fullName, password }) 
        }))
    }, [])

    return (
         <Form
            handleCloseDialog={handleCloseDialog}
            title="Регистрация"
            description="Введите ваш email и пароль"
            onSubmit={registrate}
            submitAction="Зарегистрироваться"
            changeForm={setLogin}
            changeFormAction="Логин"
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
                id="full-name"
                label="Полное имя"
                type="text"
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

export default RegistrationForm;