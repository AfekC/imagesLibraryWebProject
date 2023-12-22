import { useState } from 'react';
import { Paper, Grid, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BaseCard } from '../BaseCard/BaseCard';
import { User } from '../../types';
import { EditableTextField } from '../EditableTextField/EditableTextField';
import Link from '@mui/material/Link';
import { ImageFilePicker } from '../ImagePicker/ImagePicker';
import { useSelector } from 'react-redux';

export const Profile = () => {

  const getUser = useSelector((state: { user: { user: User}}) => state.user.user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentUserDetails, setCurrentUserDetails] = useState<User>({...getUser}); 
  const handleUserChanges = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCurrentUserDetails((prevCurrentUserData) => {
            return {
                ...prevCurrentUserData,
                [name]: value,
            }
        })
    }

  return (
    <BaseCard title="פרופיל">
      <Grid container justifyContent="center" height="90%" width="70%" marginLeft="15%" marginRight="15%" marginTop="7vh">
        <Grid container justifyContent="center" height="10%">
          {selectedFile ? (
            <img
              loading='lazy'
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          ) : (
            <AccountCircleIcon style={{ fontSize: '10vw' }} />
          )}
          <ImageFilePicker onFileSelect={(file) => setSelectedFile(file)}/>
        </Grid>
        <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center', width: "50%", height: "60%" }}>
          <EditableTextField name="firstName" label="שם פרטי" value={currentUserDetails.firstName} onChange={handleUserChanges} />
          <EditableTextField  name="lastName"label="שם משפחה" value={currentUserDetails.lastName} onChange={handleUserChanges} />
          <EditableTextField name="username" label="שם משתמש" value={currentUserDetails.username} onChange={handleUserChanges} />
          <Button color="success" fullWidth sx={{ marginBottom: '3vh'}}>
             Login
           </Button>
          <Link>שנה סיסמה</Link>
        </Paper>
      </Grid>
    </BaseCard>
  );
};
