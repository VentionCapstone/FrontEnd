import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import useSignInMutation from '@src/api/mutations/auth/useSignInMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import InputForm from '@src/components/input/InputForm';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { AuthData } from '@src/types/auth.types';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const SignIn = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync, isPending } = useSignInMutation();

  const onSubmit: SubmitHandler<AuthData> = async (Inputdata: AuthData) => {
    await mutateAsync(Inputdata);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Box
      sx={{
        mx: 'auto',
        mt: '5%',
        border: '1px solid #b0b0b0',
        borderRadius: 2,
        maxWidth: '600px',
      }}
    >
      <Typography variant="subtitle1" align="center" margin={5} fontWeight="bold">
        Sign In
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">Please login</Typography>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Stack direction="column" spacing={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  type="email"
                  placeholder="Email"
                  label="Email"
                  required={true}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor={`outlined-adornment-password`}>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    required
                    label="Password"
                    placeholder="Password"
                    id={`outlined-adornment-password`}
                    type={showPassword ? 'text' : 'password'}
                    onChange={field.onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            />
          </Stack>
          <ButtonPrimary loading={isPending}>Sign in</ButtonPrimary>
        </form>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'underline',
          }}
        >
          <Button
            sx={{
              'margin': '0',
              'padding': '0',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            onClick={handleModal}
          >
            Forgot Password?
          </Button>
        </Box>
        <Typography variant="subtitle2" align="center" color="gray">
          If you do not have an account, please{' '}
          <Link component={RouterLink} to={ENDPOINTS.auth.signUp} sx={{ color: 'primary.main' }}>
            sign up
          </Link>
        </Typography>
      </Stack>
      {isModalOpen && (
        <ForgotPasswordModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </Box>
  );
};

export default SignIn;
