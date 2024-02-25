import { GridColDef } from "@mui/x-data-grid";

export const imageLibraryHeaders: GridColDef[] = [
    { field: 'image', headerName: 'תמונה', width: 200 },
    { field: 'commentsLength', headerName: 'מספר פוסטים', width: 400 },
    { field: 'creatorName', headerName: 'שם משתמש', width: 400 },
    {
        field: 'createdAt',
        headerName: 'תאריך',
        width: 200,
    }
];