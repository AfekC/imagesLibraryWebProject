import { SxProps, Theme } from '@mui/material';

export interface BaseMenuProps {
    parentElement?: HTMLButtonElement | HTMLTextAreaElement;
    isOpen: boolean;
    sx?: SxProps<Theme>;
}