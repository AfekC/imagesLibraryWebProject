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
import { AxiosResponse } from 'axios';
import {useDispatch} from "react-redux";
import { updateCurrentUser } from '../../store/user/userReducer';
import { registerUser } from '../../services'
import { User } from '../../types';

export const Register = ({ onExit, isOpen }: registerProps) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState<User>({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    });

    const [errorData, setErrorData] = useState<User>({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        username: '',
    });

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
        case 'firstName':
            message = value.trim() === '' || value.trim().length < 4  ? 'השם צריך להיות מעל 4 תווים' : '';
            break;
        case 'lastName':
            message = value.trim() === '' || value.trim().length < 4  ? 'השם צריך להיות מעל 4 תווים' : '';
            break;
        case 'username':
            message = value.trim() === '' || value.trim().length < 4  ? 'השם משתמש צריך להיות מעל 4 תווים' : '';
            break;
        case 'password':
            message = value.length < 8 ? 'הסיסמה חייבת להכיל לפחות 8 אותיות' : '';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            message = emailRegex.test(value) ? '' : 'אימייל לא תקין';
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
                const { data: user} : AxiosResponse<User> = await registerUser(formData);
                dispatch(updateCurrentUser(user));
                handleClose();
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errorData['firstName']}
            helperText={errorData['firstName']}
            margin="normal"
            />

            <TextField
            fullWidth
            label="שם משפחה"
            variant="outlined"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errorData['lastName']}
            helperText={errorData['lastName']}
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

            <TextField
            fullWidth
            label="אימייל"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errorData['email']}
            helperText={errorData['email']}
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