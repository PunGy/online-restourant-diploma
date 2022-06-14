import * as React from 'react';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Typography } from '@mui/material';
import useFetch from '../../network/useFetch';

const RegistrationForm = ({ handleCloseDialog, setLogin }) => {
    const {fetchData: sendRegistrate} = useFetch()

    const registrate = React.useCallback(async () => {
        const email = document.getElementById('email').value
        const fullName = document.getElementById('full-name').value
        const password = document.getElementById('password').value
        await sendRegistrate('/registration', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, full_name: fullName, password }) 
        })
        handleCloseDialog()
    }, [])
    return (
        <>
            <DialogTitle>Регистрация</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Зарегистрируйтесь, чтобы иметь возможность делать заказы
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
            </DialogContent>
            <DialogActions>
                <Typography onClick={setLogin} sx={{ flex: '1 1 0', cursor: 'pointer', textDecoration: 'underline' }} color="primary">Логин</Typography>
                <Button onClick={handleCloseDialog}>Отмена</Button>
                <Button onClick={registrate}>Регистрация</Button>
            </DialogActions>
        </>
    )
}

export default RegistrationForm;