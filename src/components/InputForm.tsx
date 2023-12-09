import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { TFormData } from '../pages/signup/Signup';

type InputProps = TextFieldProps & {
  register?: UseFormRegister<TFormData>;
};

const InputForm = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  return <TextField ref={ref} fullWidth {...props} />;
});
InputForm.displayName = 'InputForm';

export default InputForm;
