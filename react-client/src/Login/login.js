import { useState, useEffect  } from 'react';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';
import { Register } from '../Register/register';
import { BaseCard } from '../BaseCard/baseCard';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const cachedUsername = localStorage.getItem('username');
        return () => {
            setPassword('');
            setUsername('');
        }
      }, []);

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    };

    const handleInputChange = (event, setFunction) => {
        setFunction(event.target.value)
    }

    return (
        <BaseCard title="התחברות">
            <Grid container justifyContent="center" height="100%" width="100%">
                {open + "fdsd"}
            { open? <Register onExit={() => setOpen(false)} /> : null}
                    <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center', width: "50%", height: "40%", marginTop: "10%" }}>
                        <Typography variant="h5" gutterBottom sx={{ fontSize: "1.5vw"}}>
                            התחברות
                        </Typography>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(event) => handleInputChange(event, setUsername)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(event) => handleInputChange(event, setPassword)}
                        />
                        <Button color="success" sx={{ fontSize: "1vw"}} onClick={handleLogin}>
                            Login
                        </Button>

                        <Typography 
                        variant="h6"
                         component="div" 
                         sx={{ flexGrow: 1, textAlign: 'left',  fontSize: '1vw'}}
                         onClick={() => setOpen(true)}
                         >
                            עדיין לא רשום הרשם עכשיו
                        </Typography>
                    </Paper>
            </Grid>
        </BaseCard>
    );
};
