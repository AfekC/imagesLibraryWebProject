import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { registerProps } from '../../types';
import { useAuth } from "../../contexts/AuthContext";
import { registerUser } from '../../services'
import { User } from '../../types';

export const Register = ({ onExit, isOpen, onRegister }: registerProps) => {

    const [formData, setFormData] = useState<User>({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
    } as User);

    const [errorData, setErrorData] = useState<User>({
        firstname: '',
        lastname: '',
        password: '',
        username: '',
    } as User);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: {name: string, value: string}}) => {
        const { name, value } = event.target;
        const fieldState = validateField(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrorData((prevErrors) =>({
            ...prevErrors,
            [name]: fieldState.message
        }));
        return fieldState.isValid;
    };

  const handleClose = () => {
    onExit();
  };

  const validateField = (name: string, value: string): {isValid: Boolean;message: String;} => {
    let message = '';
    switch (name) {
        case 'firstname':
            message = value.trim() === '' || value.trim().length < 4  ? 'השם צריך להיות מעל 4 תווים' : '';
            break;
        case 'lastname':
            message = value.trim() === '' || value.trim().length < 4  ? 'השם צריך להיות מעל 4 תווים' : '';
            break;
        case 'username':
            message = value.trim() === '' || value.trim().length < 4  ? 'השם משתמש צריך להיות מעל 4 תווים' : '';
            break;
        case 'password':
            message = value.length < 8 ? 'הסיסמה חייבת להכיל לפחות 8 אותיות' : '';
            break;
        default:
            message = '';
     }
     return { 
        isValid: !message,
        message
     }
    };

    const handleSubmit = async () => {
        const isValid = Object.entries(formData).every(([key, value]) => {
            return handleChange({
                target: {
                    name: key,
                    value
                }
            })
        });
        if(isValid) {
            try {
                await registerUser(formData);
                handleClose();
                onRegister(formData);
            } catch(error) {
                console.error("cannot register", error);
            }
        }
    }

  return (
      <Dialog
        open={isOpen}
        PaperComponent={Paper}
        disableEscapeKeyDown={false}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', textAlign: 'center'}} id="draggable-dialog-title">
          הרשם עכשיו
        </DialogTitle>
        <DialogContent>
        <Container maxWidth="xs">
            <TextField
            fullWidth
            label="שם פרטי"
            variant="outlined"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            error={!!errorData['firstname']}
            helperText={errorData['firstname']}
            margin="normal"
            />

            <TextField
            fullWidth
            label="שם משפחה"
            variant="outlined"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            error={!!errorData['lastname']}
            helperText={errorData['lastname']}
            margin="normal"
            />

        <TextField
            fullWidth
            label="שם משתמש"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errorData['username']}
            helperText={errorData['username']}
            margin="normal"
            />

            <TextField
            fullWidth
            label="סיסמה"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errorData['password']}
            helperText={errorData['password']}
            margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                רישום
            </Button>
        </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ marginLeft: '40%', marginRight: '40%' }} onClick={handleClose}>
            יציאה
          </Button>
        </DialogActions>
      </Dialog>
  );
}