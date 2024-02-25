import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { BaseMenu } from '../BaseMenu/baseMenu';
import {BaseMenuProps, Weather} from '../../types';
import { useAuth } from "../../contexts/AuthContext";
import {useEffect, useState} from 'react';
import { getCurrentWeather } from "../../services/api/wetherApi";

export const Header = () => {

    const { user } = useAuth();
    const [currentWeather, setCurrentWeather] = useState<NonNullable<Weather>>();
    const [menuData, setMenuData] = useState<BaseMenuProps>({
        isOpen: false
    });

    useEffect(() => {
        const initCurrentWeather = async () => {
            const weather = await getCurrentWeather();
            setCurrentWeather(weather);
        }
        initCurrentWeather();
        return () => {
        }
    },[])

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMenuData((prevMenuData) => ({
            ...prevMenuData,
            isOpen: !prevMenuData.isOpen,
            parentElement: prevMenuData.isOpen ? undefined : event.currentTarget,
        }));
      };

    const getFormattedMessage = () => {
        if (user) {
            return user.username? "שלום" + `  ${user.username}` : 'שלום אורח';
        }
        return '';
    }

    const getWeatherIcon = (temp: number) => {
        return temp < 20 ? <AcUnitIcon/> : <WbSunnyIcon/>;
    };

    return (
        <AppBar position="sticky" sx={{ height: '25vh' }}>
            <Toolbar disableGutters sx={{width: '100vw', paddingLeft: '1vw'}} >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    ספריית תמונות
                </Typography>
                <IconButton color="inherit" onClick={handleMenuOpen} sx={{ width: '8vw'}}>
                    { user && user.image? <img src={user.image} width="24px" height="24px"/> : <AccountCircleIcon />}
                    <BaseMenu sx={{ marginRight: '2vw', width: '10vw'}} isOpen={menuData.isOpen} parentElement={menuData.parentElement}/>
                    <span style={{ fontSize: '1vw'}}>{getFormattedMessage()}</span>
                </IconButton>
                <div>
                    {currentWeather? getWeatherIcon(currentWeather.temperature) : ''}
                    <p>{`Temperature: ${parseInt(currentWeather?.temperature?.toString() as string || '')}°C`}</p>
                </div>
            </Toolbar>
        </AppBar>
    )
}
