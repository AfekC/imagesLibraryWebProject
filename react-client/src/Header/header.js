import { AppBar, Toolbar, Typography, IconButton, Badge} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = ({ title }) => {
    return (
        <AppBar position="sticky" sx={{ height: '8vh', fontSize: '1vw' }}>
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left',  fontSize: '1vw'}}>
                { title }
            </Typography>
                <AccountCircleIcon sx={{ marginRight: "1%"}} />
                <span>שלום אורח</span>
            </Toolbar>
        </AppBar>
    )
}
