import React, { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImageFilePickerProps {
  onFileSelect: (file: File) => void;
}

export const ImageFilePicker: React.FC<ImageFilePickerProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/') && onFileSelect) {
        onFileSelect(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="fileInput"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput">
        <Button
          component="span"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
        </Button>
      </label>
    </div>
  );
};