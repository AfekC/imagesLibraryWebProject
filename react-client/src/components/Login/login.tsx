import { useState, useEffect  } from 'react';
import { TextField, Button, Paper, Typography, Grid, Link } from '@mui/material';
import { BaseCard } from '../BaseCard/BaseCard';
import { loginUser, getUser } from '../../services'
import {useDispatch} from "react-redux";
import { updateCurrentUser } from '../../store/user/userReducer';
import { useNavigate } from "react-router-dom";
import { Register } from '../Register/register';
import {User} from "../../types";
import {AxiosResponse} from "axios";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            const cachedUsername = localStorage.getItem('username');
            const cachedPassword = localStorage.getItem('password');
            if (cachedUsername && cachedPassword) {
                setUsername(cachedUsername);
                setPassword(cachedPassword);
                handleLogin(cachedUsername, cachedPassword);
            }
        }
      }, []);


    const handleLogin = async (username: string, password: string) => {
        try {
            const { data: user }: AxiosResponse<{ user: User}, any> = await loginUser({ username, password });
            user.user.password = password;
            dispatch(updateCurrentUser(user.user));
            console.trace();
            navigate('/library');
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
                    <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center', width: "50%", height: "70%", marginTop: "5%" }}>
                        <Typography variant="h5" gutterBottom>
                            התחברות
                        </Typography>
                        <TextField
                            label="שם משתמש"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            rows={6}
                            onChange={(event) => handleInputChange(event, setUsername)}
                        />
                        <TextField
                            label="סיסמה"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            rows={6}
                            onChange={(event) => handleInputChange(event, setPassword)}
                        />
                        <Button color="success" sx={{ height: '10%', width: '60%'}} onClick={() => handleLogin(username, password)}>
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
