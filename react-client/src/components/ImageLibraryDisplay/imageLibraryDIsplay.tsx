import React, {useEffect, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ImageLibraryRow} from "./ImageLibraryRow";
import Switch from '@mui/material/Switch';
import { User} from "../../types";
import { getUserByUserId } from "../../services";
import { useNavigate } from "react-router-dom";
import { BaseCard } from "../BaseCard/BaseCard";
import { ImageUpload } from "../ImageUpload/imageUpload";
import {Grid} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useMedia } from "../../contexts/MediaContext";
import {DataGrid, GridRowId} from '@mui/x-data-grid';
import { imageLibraryHeaders } from "./ImageLibraryConfiguration";
import { ImageItem } from "./types";

export const ImageLibraryDisplay = () => {

    const { images, addPost, deletePosts } = useMedia();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<Record<string, User>>({});
    const [checked, setChecked] = useState(false);
    const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

    useEffect(() => {
        const getAllUserImages = async () => {
            const userIds = new Set<string>();
            if (images) {
                Object.values(images).forEach((image) => {
                    userIds.add(image.creator);
                });
                (await Promise.all(Array.from(userIds).map((userId) => getUserByUserId(userId)))).forEach((user) => {
                    setUsers((prev: Record<string, User>) => ({
                        ...prev,
                        [user.data._id]: user.data
                    }));
                });
            }
        };
        getAllUserImages();
        return () => {
        }
    }, [images]);

    const getFilteredImages = useMemo(() => {
        if (checked) {
            return Object.values(images || {}).filter((image) => image.creator === user?._id);
        }
        return Object.values(images || {});
    }, [checked, images]);

    const currentImages = useMemo<ImageItem[]>(() => {
       return getFilteredImages.map((filteredImage) => {
            return {
                id: filteredImage._id,
                image: filteredImage.imageRef,
                creatorName: users[filteredImage.creator]?.username as string,
                creatorId: filteredImage.creator,
                commentsLength: filteredImage.comments.length,
                createdAt: new Date(filteredImage.createdAt).toDateString()
            }
        })
    }, [getFilteredImages, users]);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const onImageUploaded = async (formData: FormData) => {
        if (user) {
            await addPost(formData);
            setUsers((prev) => ({
                ...prev,
                [user._id]: user
            }));
        }
    };

    const handleSelection = (currentSelectedImages: GridRowId[]) => {
        if (images) {
            setSelectedImages(currentSelectedImages.map((rowId) => rowId.toString()));
        }
    };

    return (
        <BaseCard overflow={false}>
            <div>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="3%"
            >
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    לחץ כדי להעלות פוסט
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={selectedImages.length === 0}
                    onClick={() => deletePosts(selectedImages)}
                >
                    לחץ כדי למחוק פוסטים בחורים
                </Button>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="body1">פוסטים שלי בלבד</Typography>
                    </Grid>
                    <Grid item>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'פוסטים שלי' }}
                        />
                    </Grid>
                </Grid>
            </Box>
            { open? <ImageUpload onExit={() => setOpen(false)} isOpen={open} onSend={(formData: FormData) => onImageUploaded(formData)} /> : null}
                <DataGrid
                    checkboxSelection
                    rowSelection
                    hideFooterSelectedRowCount
                    style={{
                        "maxHeight": "82vh",
                        "marginTop": "2.8vh"
                    }}
                    rows={currentImages}
                    columns={imageLibraryHeaders}
                    getRowId={(row: ImageItem) => row.id}
                    isRowSelectable={({row}: { row: ImageItem}) => row.creatorId === user?._id}
                    onRowSelectionModelChange={(rows) => handleSelection(rows) }
                    onRowDoubleClick={({ row }: { row: ImageItem}) => {
                        navigate(`/image/${row.id}`);
                    }}
                    slots={{
                        cell: ImageLibraryRow,
                    }}
                />
            </div>
        </BaseCard>
    );
};

export default ImageLibraryDisplay;
