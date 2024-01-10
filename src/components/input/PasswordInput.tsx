import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { STRONG_PASSWORD_REGEX } from '@/config/regexp.config';
import { PasswordInputProps } from '@/types/auth.types';

const PasswordInput = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  confirmPassword,
  setIsPasswordValid,
}: PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validatePassword = (value: string) => {
    if (!STRONG_PASSWORD_REGEX.test(value)) {
      setPasswordError(
        'Password must be at least 8  long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      setIsPasswordValid(false);
    } else {
      setPasswordError(null);
      setIsPasswordValid(true);
    }
  };

  const validateConfirmPassword = (confirmPasswordValue: string, passwordValue: string) => {
    if (confirmPasswordValue !== passwordValue) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError(null);
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => {
    field.onChange(e);
    validatePassword(e.target.value);

    if (confirmPassword) {
      validateConfirmPassword(confirmPassword, e.target.value);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
          <OutlinedInput
            {...field}
            error={fieldState.invalid || !!passwordError}
            required
            label={label}
            placeholder={placeholder}
            id={`outlined-adornment-${name}`}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => handlePasswordChange(e, field)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Typography variant="caption" color="error">
            {passwordError}
          </Typography>
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
