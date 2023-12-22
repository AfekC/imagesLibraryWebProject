import React, { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImageFilePickerProps {
  onFileSelect: (file: File) => void;
}

export const ImageFilePicker: React.FC<ImageFilePickerProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    } else {
      setSelectedFile(null);
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
      {selectedFile && (
        <div>
          <p>Selected Image: {selectedFile.name}</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
};