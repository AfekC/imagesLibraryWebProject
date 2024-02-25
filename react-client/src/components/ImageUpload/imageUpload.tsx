import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {ImageFilePicker} from "../ImagePicker/ImagePicker";
import {TextField} from "@mui/material";

export const ImageUpload = ({ onExit, isOpen, onSend }: { onSend: Function, isOpen: boolean, onExit: Function }) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageCaption, setImageCaption] = useState("");

    const sendImage = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile as File);
        formData.append("caption", imageCaption);
        onSend(formData);
        onExit();
    }

    const handleClose = () => {
        onExit();
    };

    return (
        <Dialog
            open={isOpen}
            PaperComponent={Paper}
            disableEscapeKeyDown={false}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move', textAlign: 'center'}} id="draggable-dialog-title">
                העלה תמונה עכשיו
            </DialogTitle>
            <DialogContent>
                <Container maxWidth="xs">
                    <Grid container direction="column" justifyContent="center" alignItems="center" height="35%">
                        {selectedFile? (
                            <img
                                loading="lazy"
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                style={{ maxWidth: '100%', maxHeight: '100%', zIndex: 121212 }}
                            />
                        ) : (
                            <AccountCircleIcon style={{ fontSize: '10vw' }} />
                        )}
                        <ImageFilePicker onFileSelect={(file) => setSelectedFile(file)} />
                    </Grid>

                    <TextField
                        label="Add a image caption"
                        variant="outlined"
                        fullWidth
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                    />

                    <Button type="submit" disabled={selectedFile === null} variant="contained" color="primary" fullWidth onClick={sendImage}>
                        העלה תמונה
                    </Button>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button autoFocus sx={{ marginLeft: '40%', marginRight: '40%' }} onClick={handleClose}>
                    יציאה
                </Button>
            </DialogActions>
        </Dialog>
    );
}