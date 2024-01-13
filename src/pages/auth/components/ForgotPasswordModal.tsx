import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import usePostForgotPasswordEmailMutation from '@src/api/mutations/auth/usePostForgotPasswordEmailMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import InputForm from '@src/components/input/InputForm';
import { ForgotPasswordReq, forgotPasswordSchema } from '@src/types/auth.types';

interface ForgotPasswordModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ForgotPasswordModal({ isModalOpen, setIsModalOpen }: ForgotPasswordModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordReq>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleClose = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, [setIsModalOpen]);

  const { mutate, isPending } = usePostForgotPasswordEmailMutation();
  const onSubmit = useCallback(
    ({ email }: { email: string }) => {
      mutate(email);
    },
    [mutate]
  );

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle
        sx={{
          borderBottom: '1px solid',
          borderColor: 'secondary2.light',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography fontWeight={'600'}>Forgot password?</Typography>
        <IconButton aria-label="close" onClick={handleClose} sx={{ padding: 1 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ paddingY: 5, color: 'primary.main' }}>
          Enter the email address associated with your account, and we’ll email you a link to reset
          your password.
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputForm
                {...field}
                type="email"
                placeholder="Email"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Box mt={10}>
            <ButtonPrimary loading={isPending}>Send reset link</ButtonPrimary>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordModal;
