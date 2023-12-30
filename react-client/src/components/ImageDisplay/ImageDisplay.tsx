import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DisplayedImage, User} from "../../types";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useLocation, Location } from "react-router-dom";
import { BaseCard } from "../BaseCard/BaseCard";
import Divider from "@mui/material/Divider";

export const ImageDisplay = () => {

    const location: Location<{ image: DisplayedImage}>  = useLocation();
    const [ users, setUsers ] = useState<Record<string, User>>({});
    const getImage = ()=> location.state.image;
    console.log(getImage());
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
                    overflowY: 'auto'
                }}
            >
                {getImage().comments?.map((comment, index) => (
                    <div key={comment.userId}>
                        <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <Avatar
                                    alt={users[comment.userId]?.username}
                                    src={
                                        users[comment.userId]?.image ? users[comment.userId].image : ''
                                    }
                                >
                                    {users[comment.userId]?.image ? null : <AccountCircleIcon />}
                                </Avatar>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign:'left', marginTop: '1%', fontSize: '1vw' }}>
                                <strong>shai</strong>{users[comment.userId]?.username}
                            </Grid>
                            <Grid item xs={8} sx={{ textAlign:'right', marginTop: '1%', fontSize: '1vw' }}>
                                <strong>{comment.comment}</strong>
                            </Grid>
                        </Grid>
                        <Divider/>
                    </div>
                ))}
            </Paper>
        </BaseCard>
    );
};