import { Paper, Typography,IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const BaseCard = ({ children, title, overflow = false }) => {
    return (
        <Paper
            elevation={10}
            sx={{
                position: 'absolute',
                top: '10vh',
                left: 0,
                right: 0,
                zIndex: 1101,
                height: '90%',
                width: '80vw',
                padding: '0',
                marginLeft: '10vw',
                textAlign: 'center',
                overflowY: overflow? 'scroll' : 'hidden'
            }}
        >
            <IconButton
                sx={{ position: 'absolute', top: 0, right: 0 }}
                aria-label="Go Back"
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography sx={{fontSize: '3vw'}} color="blue" className="py-2">{title}</Typography>
            {children}
        </Paper>
    );
};
