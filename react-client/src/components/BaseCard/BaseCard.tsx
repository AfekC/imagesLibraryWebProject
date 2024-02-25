import { Paper, Typography,IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { BaseCardProps } from '../../types';
import { Header } from '../Header/header';
import { useAuth } from "../../contexts/AuthContext";
import {useEffect} from "react";

export const BaseCard = ({ children, title, overflow = false }: BaseCardProps) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { isLogged } = useAuth();

    useEffect(() => {
        if (!isLogged) {
            navigate('/login');
        }
    }, [location.pathname])

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Header/>
            <Paper
                elevation={10}
                sx={{
                    position: 'absolute',
                    top: '8%',
                    left: 0,
                    right: 0,
                    zIndex: 1101,
                    height: '90%',
                    width: '90vw',
                    padding: '0',
                    marginLeft: '5vw',
                    textAlign: 'center',
                    overflowY: overflow? 'scroll' : 'hidden'
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={goBack}
                    aria-label="Go Back"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography sx={{fontSize: '4vh'}} color="blue" className="py-2">{title}</Typography>
                {children}
            </Paper>
        </div>
    );
};
