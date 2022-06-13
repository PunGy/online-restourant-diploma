import * as React from 'react';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Typography } from '@mui/material';

const RegistrationForm = ({ handleCloseDialog, setLogin }) => {
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
                <Button onClick={handleCloseDialog}>Регистрация</Button>
            </DialogActions>
        </>
    )
}

export default RegistrationForm;