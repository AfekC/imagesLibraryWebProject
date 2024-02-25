import { useState, useEffect  } from 'react';
import { TextField, Button, Paper, Typography, Grid, Link } from '@mui/material';
import { BaseCard } from '../BaseCard/BaseCard';
import { useNavigate } from "react-router-dom";
import { Register } from '../Register/register';
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import {GoogleCredentials, User} from "../../types";
import './login.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLogged, googleLogin } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate('/library');
        }
    }, [isLogged])

    const handleLogin = async (username: string, password: string) => {
        try {
            login(username, password);
            navigate('/library');
        } catch(error) {
            console.error("failed to login user", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
         setFunction: React.Dispatch<React.SetStateAction<string>>) => {
        setFunction(event.target.value)
    };

    const handleRegister = (user: User) => {
        login(user.username, user.password as string);
    }

    return (
        <BaseCard title="התחברות">
            <Grid container justifyContent="center" height="100%" width="100%">
            { open? <Register onExit={() => setOpen(false)} onRegister={handleRegister} isOpen={open} /> : null}
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

                        <center style={{ width: "20vh" }}>
                            <GoogleLogin
                                width="20vw"
                                onSuccess={googleLogin}
                                onError={() => {console.log('Google login failed')}}
                            />
                        </center>

                        <Button
                            color="success"
                            sx={{ height: '10%', width: '60%'}}
                            onClick={() => handleLogin(username, password)}
                        >
                            התחבר
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
