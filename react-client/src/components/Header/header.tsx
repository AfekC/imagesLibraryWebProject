import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BaseMenu } from '../BaseMenu/baseMenu';
import { BaseMenuProps, User } from '../../types';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const Header = () => {

    const [menuData, setMenuData] = useState<BaseMenuProps>({
        isOpen: false
    });

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMenuData((prevMenuData) => ({
            ...prevMenuData,
            isOpen: !prevMenuData.isOpen,
            parentElement: prevMenuData.isOpen ? undefined : event.currentTarget,
        }));
      };

    const getUser = useSelector((state: { user: { user: User}}) => state.user.user);

    const getFormattedMessage = () => {
        return getUser.firstName? `>שלום ${getUser.firstName}` : 'שלום אורח';
    }

    return (
        <AppBar position="sticky" sx={{ height: '25vh' }}>
            <Toolbar disableGutters sx={{width: '100vw', paddingLeft: '1vw'}} >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    ספריית תמונות
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleMenuOpen} sx={{ width: '8vw'}}>
                    <AccountCircleIcon />
                    <BaseMenu sx={{ marginRight: '2vw', width: '10vw'}} isOpen={menuData.isOpen} parentElement={menuData.parentElement}/>
                    <span>{getFormattedMessage()}</span>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
