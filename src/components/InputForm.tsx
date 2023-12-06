import { TextField, TextFieldProps } from '@mui/material';

const InputForm = (props: TextFieldProps) => {
  return <TextField {...props} fullWidth color="common" />;
};

export default InputForm;
