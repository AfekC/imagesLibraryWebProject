import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    IconButton,
} from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ImageUpload } from "../ImageUpload/imageUpload";
import { useParams } from 'react-router-dom';
import { User } from "../../types";
import { BaseCard } from "../BaseCard/BaseCard";
import {getUserByUserId} from '../../services';
import { useMedia } from "../../contexts/MediaContext";
import { useAuth } from "../../contexts/AuthContext";

export const ImageDisplay = () => {

    const { imageId } = useParams<{imageId: string}>();
    const { updateComments, currentImage, updateCurrentImage, editPost } = useMedia();
    const { user } = useAuth();
    const [ users, setUsers ] = useState<Record<string, User>>({});
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [openComments, setOpenComments] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        updateCurrentImage(imageId as string);
        return () => { }
    }, []);

    useEffect(() => {
        const setAllUsersCommented = async (): Promise<void> => {
            const userIds = new Set<string>();
            (currentImage.comments || []).forEach((comment) => {
                userIds.add(comment.userId);
            });
            (await Promise.all(Array.from(userIds).map((userId) => getUserByUserId(userId)))).forEach((user) => {
                setUsers((prev: Record<string, User>) => ({
                    ...prev,
                    [user.data._id]: user.data
                }));
            });
        };
        setAllUsersCommented();
        return () => {
        }
    }, [currentImage._id]);

    const sendMessage = async () => {
        if (user) {
            setUsers((prev) => ({
                ...prev,
                [user._id]: user
            }));
            await updateComments(currentMessage, imageId as string);
            setCurrentMessage('');
        }
    }

    const getFormattedDate = (currentDate: Date) => {
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const handleEditPost = async (imageData: FormData) => {
        await editPost(imageId as string, imageData);
    }

    return (
        <BaseCard>
            <Card>
                { isOpen? <ImageUpload onExit={() => setIsOpen(false)} isOpen={isOpen} onSend={(formData: FormData) => handleEditPost(formData)} /> : null}
                <div>
                    {currentImage ? (
                        <div>
                            <IconButton
                                style={{ marginLeft: '80vw' }}
                                onClick={() => setIsOpen(true)}
                            >
                                {  user?._id === currentImage.creator? <EditIcon  />: null }
                            </IconButton>
                            <CardMedia
                                component="img"
                                alt="Post Image"
                                image={currentImage.imageRef}
                                style={{
                                    height: '70vh',
                                    width: '80%',
                                    marginLeft: '10vw',
                                }}
                            />
                        </div>
                    ) : (
                        <AccountCircleIcon style={{ fontSize: '10vw' }} />
                    )}
                </div>
                <CardContent>
                    <Typography variant="body1">{currentImage.name}</Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<CommentIcon />}
                        onClick={() => setOpenComments(true)}
                    >
                        הצג תגובות
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={openComments} onClose={() => setOpenComments(false)} fullWidth>
                <DialogTitle>Comments</DialogTitle>
                <DialogContent>
                    <List>
                        {(currentImage.comments || []).map((comment, index) => (
                            <React.Fragment key={comment.userId + comment.createdAt}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        {users[comment.userId] && users[comment.userId].image?
                                            <img src={users[comment.userId].image} width="24px" height="24px"/>
                                            :  <AccountCircleIcon style={{ fontSize: '2vw' }}/>
                                        }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={users[comment.userId]?.username}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="textPrimary">
                                                    {getFormattedDate(new Date(comment.createdAt))}:
                                                </Typography>
                                                &nbsp;
                                                <Typography component="span" variant="body2" color="textPrimary">
                                                    {comment.text}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index < (currentImage.comments || []).length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={currentMessage}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage()
                            }
                        }}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <IconButton color="primary" onClick={() => sendMessage()}>
                        <SendIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </BaseCard>
    );
};