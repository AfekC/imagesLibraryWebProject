import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { EditableTextFieldProps } from '../../types'
import { UserEditIcon } from '../UserEditIcon/userEditIcon';

export const EditableTextField = ({ value, onChange, onEnter, label, name, error, width, isPermanentEdit }: EditableTextFieldProps) => {

    const [isEdit, setIsEdit] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  if (isEdit || isPermanentEdit) {
    return (
      <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end', height: '20%' }}>
      <TextField
        label={label}
        variant="outlined"
        name={name || ''}
        value={value}
        error={!!error}
        helperText={error}
        onChange={handleInputChange}
        sx={{ width: width || '70%', marginBottom: '1%' }}
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
    <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'flex-end', height: '10%', marginLeft: 'auto' }}>
      <div style={{ paddingBottom: '10%'}}>
        <UserEditIcon onClick={() => setIsEdit(!isEdit)} />
      </div>
      <span style={{ width: '60%', paddingBottom: '10%', marginLeft: '15%' }}>
          <b>{value}</b>
      </span>
      <span style={{ width: '20%', paddingBottom: '10%', marginLeft: '30%'}}>
          :{label}
      </span>
        {<span style={{ width: '100%', textAlign: "center"}}>{ !!error? error: ''}</span>}
  </div>
  );
};