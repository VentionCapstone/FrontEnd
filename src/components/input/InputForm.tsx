import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';
import { SignInReq } from '@src/types/auth.types';

type InputProps = TextFieldProps & {
  register?: UseFormRegister<SignInReq>;
};

const InputForm = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  return <TextField ref={ref} fullWidth {...props} />;
});
InputForm.displayName = 'InputForm';

export default InputForm;
