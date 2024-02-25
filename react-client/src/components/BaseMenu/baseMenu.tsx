import {
  Menu,
  MenuItem
} from '@mui/material';
import { BaseMenuProps } from '../../types';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const BaseMenu = ({ parentElement, isOpen, sx }: BaseMenuProps) => {
  
    const { logout, isLogged } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleViewProfile = () => {
        navigate('/profile');
    };

    const handleViewImages = () => {
        navigate('/library');
    };

  return (
          <Menu
            anchorEl={parentElement}
            open={isOpen}
            PaperProps={{
                style: {
                    width: '8vw',
                    height: '15vh',
                    textAlign: 'right'
                },
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  textAlign: 'right',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleViewProfile} disabled={!isLogged} sx={{justifyContent: "center"}}>פרופיל</MenuItem>
              <MenuItem onClick={handleViewImages} disabled={!isLogged} sx={{justifyContent: "center"}}>תמונות</MenuItem>
            <MenuItem onClick={handleLogout} disabled={!isLogged} sx={{justifyContent: "center"}}>יציאה</MenuItem>
          </Menu>
  );
};