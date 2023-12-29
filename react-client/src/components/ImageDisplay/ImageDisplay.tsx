import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Comment, DisplayedImage, User} from "../../types";
import { getUserByUsername } from "../../services";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useLocation, Location } from "react-router-dom";
import { BaseCard } from "../BaseCard/BaseCard";
import {ImageFilePicker} from "../ImagePicker/ImagePicker";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const ImageDisplay = () => {

    const location: Location<{ image: DisplayedImage}>  = useLocation();
    const [ users, setUsers ] = useState<Record<string, User>>({});
    const getImage = ()=> location.state.image;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // const response = await Promise.all(getComments().map((comment) => getUserByUsername(comment.userId)));
                // response.forEach((response) => {
                //     setUsers({ ...users, [response.data.username]: response.data });
                // });
                //console.log(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // @ts-ignore
    // @ts-ignore
    return (
        <BaseCard>
            <div style={{ width: '50%', height: '40vh', marginLeft: '25%', marginRight: '25%'}}>
                {getImage() ? (
                    <img style={{ width: '100%%', height: '100%'}} src={getImage().imageRef } alt={getImage().imageRef}/>
                ) : (
                    <AccountCircleIcon style={{ fontSize: '10vw' }}/>
                )}
            </div>

            <Paper
                elevation={10}
                sx={{
                    position: 'absolute',
                    zIndex: 1102,
                    height: '50%',
                    width: '50%',
                    padding: '0',
                    marginLeft: '25%',
                    textAlign: 'center',
                    overflowY: 'auto'
                }}
            >
                {getImage().comments?.map((comment, index) => (
                    <div key={index} style={{  width: '100%' }}>
                        <section style={{ width: '40vw' }}>
                            <Avatar
                                alt={users[comment.userId]?.username}
                                src={users[comment.userId]?.image ? URL.createObjectURL(users[comment.userId].image as File) : ''}
                            >
                                {users[comment.userId]?.image ? null : <AccountCircleIcon/>}
                            </Avatar>
                        </section>
                        <section style={{ width: '40vw' }}>
                            <Typography variant="body2">
                                <strong>{users[comment.userId]?.username} dsda</strong>
                                <strong>{comment.comment}  sd</strong>
                            </Typography>
                        </section>
                        <Divider />
                    </div>
                ))}
            </Paper>
        </BaseCard>
    );
};