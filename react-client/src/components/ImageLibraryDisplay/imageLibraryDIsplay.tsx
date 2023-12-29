import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ImageDisplay } from '../ImageDisplay/ImageDisplay';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DisplayedImage } from "../../types";
import { getAll } from "../../services";
import { useNavigate } from "react-router-dom";
import { BaseCard } from "../BaseCard/BaseCard";

export const ImageLibraryDisplay = () => {
    // @ts-ignore
    const [ images, setImages ] = useState<DisplayedImage[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getAll();
                setImages(response.data);
                setImages([{
                    imageRef: require('../../petel.jpeg'),
                    name: 'shai',
                    creator: { username: 'shai' },
                    size: 100,
                    createdAt: new Date(),
                    comments: [{ userId: 'shai', comment: 'good', createdAt: new Date() }],
                }])
                console.log("done");
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchImages();
        return () => {
        }
    }, []);

    return (
        <BaseCard overflow={true}>
            <List>
                {images.map((image, index) => (
                    <React.Fragment key={index}>
                        <ListItem  onClick={() => navigate(`/image/${image.creator.username}`, { state: { image } })}>
                            <div style={{ width:'5%' }}>
                                <div style={{width: '20%', marginRight:'10%'}}>
                                    {image.imageRef ? (
                                    <img src={image.imageRef}/>
                                    ) : (
                                    <AccountCircleIcon fontSize="large" color="primary" />
                                    )}
                                </div>
                            </div>
                            <div style={{ width:'90%' }}>
                                <Typography>{image.creator.username}</Typography>
                            </div>
                            <div>
                                <Typography>
                                    {image.createdAt.toDateString()}
                                </Typography>
                            </div>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </BaseCard>
    );
};

export default ImageLibraryDisplay;
