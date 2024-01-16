import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { EditableTextFieldProps } from '../../types'
import { UserEditIcon } from '../UserEditIcon/userEditIcon';

export const EditableTextField = ({ value, onChange, onEnter, label, name }: EditableTextFieldProps) => {

    console.log(value)
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  if (isEdit) {
    return (
      <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end', height: '20%' }}>
      <TextField
        label={label}
        variant="outlined"
        name={name}
        value={value}
        onChange={handleInputChange}
        sx={{ width: '70%', marginBottom: '1%' }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onEnter? onEnter(e) : null;
              setIsEdit(false);
          }
          }}
      />
      <span style={{ width: '20%', paddingBottom: '10%'}}>:{label}</span>
    </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end', height: '10%' }}>
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