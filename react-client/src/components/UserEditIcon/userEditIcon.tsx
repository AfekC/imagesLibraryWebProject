import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export const UserEditIcon = ({ onClick }: { onClick?: Function}) => {

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px' }}>
            <IconButton
                onClick={(event) => onClick? onClick(event) : null}
                style={{
                borderRadius: '50%', // Make it a circle
                border: '2px solid #ccc', // Add a border
                padding: 8, // Adjust padding as needed
                }}
            >
                <EditIcon style={{ fontSize: 20, color: '#333' }} />
            </IconButton>
        </div>
    );
};