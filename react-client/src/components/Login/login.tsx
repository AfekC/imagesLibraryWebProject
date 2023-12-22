import { useState, useEffect  } from 'react';
import { TextField, Button, Paper, Typography, Grid, Link } from '@mui/material';
import { BaseCard } from '../BaseCard/BaseCard';
import { loginUser } from '../../services'
import {useDispatch} from "react-redux";
import { updateCurrentUser } from '../../store/user/userReducer';
import { useNavigate } from "react-router-dom";
import { User } from '../../types/User';
import { Register } from '../Register/register';
import { AxiosResponse } from 'axios';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const cachedUsername = localStorage.getItem('username');
        const cachedPassword = localStorage.getItem('password');
        if (cachedUsername && cachedPassword) {
            setUsername(cachedUsername);
            setPassword(cachedPassword);
            handleLogin().then(() => {
                console.log("connected");
                navigate("/home");
            }).catch(() => {
                console.error('cannot connect');
            });
        }
        return () => {
            setPassword('');
            setUsername('');
        }
      }, []);

    const handleLogin = async () => {
        console.log('Username:', username);
        console.log('Password:', password);
        try {
            const { data: user} : AxiosResponse<User> = await loginUser({ username, password });
            dispatch(updateCurrentUser(user));
        } catch(error) {
            console.error("failed to login user", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
         setFunction: React.Dispatch<React.SetStateAction<string>>) => {
        setFunction(event.target.value)
    }

    return (
        <BaseCard title="התחברות">
            <Grid container justifyContent="center" height="100%" width="100%">
            { open? <Register onExit={() => setOpen(false)} isOpen={open} /> : null}
                    <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center', width: "50%", height: "40%", marginTop: "10%" }}>
                        <Typography variant="h5" gutterBottom>
                            התחברות
                        </Typography>
                        <TextField
                            label="שם משתמש"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(event) => handleInputChange(event, setUsername)}
                        />
                        <TextField
                            label="סיסמה"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(event) => handleInputChange(event, setPassword)}
                        />
                        <Button color="success" onClick={handleLogin}>
                            Login
                        </Button>

                        <Typography 
                            variant="h6"
                            component="div" 
                            sx={{ flexGrow: 1, textAlign: 'center',  fontSize: '1vw', marginTop: '1vh'}}
                            onClick={() => setOpen(true)}
                         >
                            <Link underline="always">
                                  עדיין לא רשום? הרשם עכשיו    
                            </Link>
                        </Typography>
                    </Paper>
            </Grid>
        </BaseCard>
    );
};
