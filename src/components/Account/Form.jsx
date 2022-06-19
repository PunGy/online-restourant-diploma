import React from 'react'
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';

function Form({ 
    handleCloseDialog,
    title,
    description,
    children,
    onSubmit,
    submitAction,
    changeForm,
    changeFormAction,
}) {
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Typography onClick={changeForm} sx={{ flex: '1 1 0', cursor: 'pointer', textDecoration: 'underline' }} color="primary">{changeFormAction}</Typography>
                <Button onClick={handleCloseDialog}>Отмена</Button>
                <Button onClick={onSubmit}>{submitAction}</Button>
            </DialogActions>
        </>
    )
}

export default Form
