import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputProps = TextFieldProps & {
  register?: UseFormRegister<SignInReq>;
};

const InputForm = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  return <TextField ref={ref} fullWidth {...props} />;
});
InputForm.displayName = 'InputForm';

export default InputForm;
