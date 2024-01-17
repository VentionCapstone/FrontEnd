import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import { ReactNode, useCallback, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { PasswordInputProps } from '@src/types/auth.types';

const PasswordInput = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  errors,
}: PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined">
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            error={!!errors[name]}
            type={showPassword ? 'text' : 'password'}
            onChange={field.onChange}
            helperText={errors[name]?.message as ReactNode}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
