import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { EditableTextFieldProps } from '../../types'
import { UserEditIcon } from '../UserEditIcon/userEditIcon';

export const EditableTextField = ({ value, onChange, label, name }: EditableTextFieldProps) => {

  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  if (isEdit) {
    return (
      <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end' }}>
      <TextField
        label={label}
        variant="outlined"
        name={name}
        value={value}
        onChange={handleInputChange}
        sx={{ width: '70%', marginBottom: '10%' }}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            setIsEdit(false);
          }}
      />
      <span style={{ width: '20%', paddingBottom: '10%'}}>:{label}</span>
    </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end' }}>
      <div style={{ paddingBottom: '10%'}}>
        <UserEditIcon onClick={() => setIsEdit(!isEdit)} />
      </div>
      <span style={{ width: '20%', paddingBottom: '10%', marginLeft: '40%'}}>
          <b>{value}</b>
      </span>
      <span style={{ width: '20%', paddingBottom: '10%', marginLeft: '0%'}}>
          :{label}
      </span>

  </div>
  );
};