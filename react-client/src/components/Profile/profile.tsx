import { useState } from 'react';
import { Paper, Grid, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BaseCard } from '../BaseCard/BaseCard';
import { User } from '../../types';
import { EditableTextField } from '../EditableTextField/EditableTextField';
import { ImageFilePicker } from '../ImagePicker/ImagePicker';
import { uploadProfileImage, updateUser } from '../../services';
import { useAuth } from "../../contexts/AuthContext";
import {AxiosResponse} from "axios";

export const Profile = () => {

  const { user, updateUser: updateCurrentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [currentUserDetails, setCurrentUserDetails] = useState<User>(() => user? {...user, password: '' }: {} as User);
  const handleUserChanges = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCurrentUserDetails((prevCurrentUserData) => {
            return {
                ...prevCurrentUserData,
                [name]: value,
            }
        })
    }

    const updateUserDetails = async() => {
      let isValid = true;
      Object.entries(currentUserDetails).forEach(([key, value]) => {
          const error = validateField(key, value);
          setFieldErrors((currentUserDetails) => ({
              ...currentUserDetails,
              [key]: error.message
          }));
          if (!error.isValid) {
              isValid = false;
          }
      });
      if (isValid) {
          const formData = new FormData();
          let user = null as unknown as AxiosResponse<User>;
          if (selectedFile) {
              formData.append('file', selectedFile);
              user = await uploadProfileImage(formData);
              updateCurrentUser(user.data);
          }
          await updateUser(currentUserDetails);
          updateCurrentUser({ ...currentUserDetails, image: user.data.image});
      }
    }

    const validateField = (name: string, value: string): {isValid: Boolean;message: String;} => {
        let message = '';
        switch (name) {
            case 'firstname':
                message = value.trim() === '' || value.trim().length < 4  ? 'השם צריך להיות מעל 4 תווים' : '';
                break;
            case 'lastname':
                message = value.trim() === '' || value.trim().length < 4  ? 'השם צריך להיות מעל 4 תווים' : '';
                break;
            case 'password':
                if (!value) {
                    message = '';
                    break;
                }
                message = value.length < 8 ? 'הסיסמה חייבת להכיל לפחות 8 אותיות' : '';
                break;
            default:
                message = '';
        }
        return {
            isValid: !message,
            message
        }
    };


  return (
      <BaseCard title="פרופיל">
          <Grid
              container
              justifyContent="center"
              height="95%"
              width="70%"
              marginLeft="15%"
              marginRight="15%"
              marginTop="-4vh"
          >
              <Grid container direction="column" justifyContent="center" alignItems="center" height="35%">
                  {selectedFile || user?.image ? (
                      <img
                          loading="lazy"
                          src={
                              selectedFile
                                  ? URL.createObjectURL(selectedFile)
                                  : user?.image
                                      ? user?.image
                                      : ''
                          }
                          alt="Selected"
                          style={{ maxWidth: '100%', maxHeight: '100%', zIndex: 121212 }}
                      />
                  ) : (
                      <AccountCircleIcon style={{ fontSize: '10vw' }} />
                  )}
                  <ImageFilePicker onFileSelect={(file) => setSelectedFile(file)} />
              </Grid>
              <Paper sx={{ padding: '2rem', textAlign: 'center', fontSize: '0.8vw', width: '50%', height: '65%', zIndex: 1121, overflowY: 'auto' }}>
                 <div>
                     <EditableTextField
                         name="firstname"
                         label="שם פרטי"
                         error={fieldErrors.firstname as string}
                         value={currentUserDetails.firstname || ''}
                         onChange={handleUserChanges}
                     />
                     <EditableTextField
                         name="lastname"
                         label="שם משפחה"
                         error={fieldErrors.lastname as string}
                         value={currentUserDetails.lastname || ''}
                         onChange={handleUserChanges}
                     />
                     <EditableTextField
                         name="password"
                         label="סיסמה"
                         error={fieldErrors.password as string}
                         value={currentUserDetails.password as string}
                         onChange={handleUserChanges}
                     />
                     <Button color="success" fullWidth sx={{ fontSize: '0.8vw'}} onClick={updateUserDetails}>
                         עדכון משתמש
                     </Button>
                 </div>
              </Paper>
          </Grid>
      </BaseCard>
  );
};
