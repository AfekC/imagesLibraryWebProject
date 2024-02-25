import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Badge, IconButton, TableCell} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";

export const ImageLibraryRow = (props: any) => {

    const field = props.field as string;
    const value = props.value as any;
    const width = props.width as number;

    return (
        <div style={{ width }}>
            { field ===  'commentsLength'?
                <IconButton color="inherit">
                    <Badge badgeContent={value} color="primary" style={{ alignContent: "left" }}>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>:
                null
            }
            {field ===  'image'?
                <TableCell style={{ width:'5%' }}>
                <div style={{width: '20%', marginRight:'10%'}}>
            {value ? (
                <img src={value} width="60px" height="60px"/>
                ) : (
                <AccountCircleIcon fontSize="large" width="60px" height="60px" color="primary" />
                )}
                </div>
                </TableCell>:
               null
            }
            {
                field !==  'image' && field !==  'commentsLength'?
                props.children as React.ReactNode?
                    props.children:
                    <TableCell>
                        {value}
                    </TableCell>:
                    null
            }

        </div>
    );
};