import {
  Menu,
  MenuItem
} from '@mui/material';
import { BaseMenuProps } from '../../types';
import {useDispatch} from "react-redux";
import { logOutCurrentUser } from '../../store/user/userReducer';

export const BaseMenu = ({ parentElement, isOpen, sx }: BaseMenuProps) => {
  
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOutCurrentUser());
    };

    const handleViewProfile = () => {
        // Implement your view profile logic here
        // For example, navigate to the user's profile page
    };

  return (
          <Menu
            anchorEl={parentElement}
            open={isOpen}
            PaperProps={{
                style: {
                    width: '8vw',
                    height: '10vh',
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
            <MenuItem onClick={handleViewProfile} sx={{justifyContent: "center"}}>פרופיל</MenuItem>
            <MenuItem onClick={handleLogout} sx={{justifyContent: "center"}}>יציאה</MenuItem>
          </Menu>
  );
};