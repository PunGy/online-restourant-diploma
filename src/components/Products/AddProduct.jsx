import * as React from 'react'
import { Grid, Card, IconButton, Dialog, DialogContent, TextField, DialogTitle, DialogActions, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import fetcher from '../../network/fetcher'

const AddProduct = ({ reload }) => {
    const [formOpen, setForm] = React.useState(false)
    
    const openForm = () => {
        setForm(true)
    }
    const closeForm = () => {
        setForm(false)
    }

    const submit = (event) => {
        event.preventDefault()
        const form = event.target

        const data = new FormData(form)
        fetcher('/products', { 
            method: 'POST',
            body: data,
        }).then(() => reload())
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <IconButton onClick={openForm}>
                    <Add sx={{ fontSize: '4rem' }} />
                </IconButton>
            </Card>
            <Dialog open={formOpen} onClose={closeForm}>
                <form onSubmit={submit}>
                    <DialogTitle>Создание продукта</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Название товара"
                            name="title"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            label="Цена"
                            name="price"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Описание"
                            name="description"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <label>
                            Изображение <br/>
                            <input type="file" id="input-image" name="image" />
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeForm}>Отмена</Button>
                        <Button type="submit">Создать</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Grid>
    )
}

export default AddProduct