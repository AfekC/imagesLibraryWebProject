import { useState, useEffect  } from 'react';
import { Paper, Grid, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BaseCard } from '../BaseCard/BaseCard';
import { User } from '../../types';
import { EditableTextField } from '../EditableTextField/EditableTextField';
import Link from '@mui/material/Link';
import { ImageFilePicker } from '../ImagePicker/ImagePicker';
import { useSelector } from 'react-redux';
import { uploadProfileImage, updateUser, getUser } from '../../services';

export const Profile = () => {

  const getUser: User = useSelector((state: { user: { user: User}}) => {
    return state.user.user as User;
  });
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

    const updateUserImage = async (file: File) => {
      if(selectedFile === null) {
        await uploadProfileImage(file);
        setSelectedFile(file)
      }
    }

    const updateUserDetails = async() => {
      await updateUser(currentUserDetails);
    }


  return (
      <BaseCard title="פרופיל">
          <Grid
              container
              justifyContent="center"
              height="90%"
              width="70%"
              marginLeft="15%"
              marginRight="15%"
              marginTop="-4vh"
          >
              <Grid container direction="column" justifyContent="center" alignItems="center" height="50%">
                  {selectedFile || getUser.image ? (
                      <img
                          loading="lazy"
                          src={
                              selectedFile
                                  ? URL.createObjectURL(selectedFile)
                                  : getUser.image
                                      ? getUser.image
                                      : ''
                          }
                          alt="Selected"
                          style={{ maxWidth: '100%', maxHeight: '100%', zIndex: 121212 }}
                      />
                  ) : (
                      <AccountCircleIcon style={{ fontSize: '10vw' }} />
                  )}
                  <ImageFilePicker onFileSelect={(file) => updateUserImage(file)} />
              </Grid>
              <Paper sx={{ padding: '2rem', textAlign: 'center', fontSize: '0.8vw', width: '50%', height: '50%', zIndex: 1121, overflowY: 'auto' }}>
                 <div>
                     <EditableTextField
                         name="firstname"
                         label="שם פרטי"
                         value={currentUserDetails.firstname || ''}
                         onChange={handleUserChanges}
                     />
                     <EditableTextField
                         name="lastname"
                         label="שם משפחה"
                         value={currentUserDetails.lastname || ''}
                         onChange={handleUserChanges}
                     />
                     <EditableTextField
                         name="username"
                         label="שם משתמש"
                         value={currentUserDetails.username}
                         onChange={handleUserChanges}
                     />
                     <Button color="success" fullWidth sx={{ fontSize: '0.8vw'}} onClick={updateUserDetails}>
                         Login
                     </Button>
                     <Link>שנה סיסמה</Link>
                 </div>
              </Paper>
          </Grid>
      </BaseCard>
  );
};
