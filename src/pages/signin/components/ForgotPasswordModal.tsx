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
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import httpClient from '@/api/httpClient';
import ButtonPrimary from '@/components/button/ButtonPrimary';
import InputForm from '@/components/input/InputForm';
import { ROUTES } from '@/config/routes.config';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

function ForgotPasswordModal({ isModalOpen, setIsModalOpen }: ForgotPasswordModalProps) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit = ({ email }: { email: string }) => {
    mutate(email);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await httpClient.post<{ success: boolean; message: 'string' }>(
        '/auth/forgot-password-email',
        { email }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(ROUTES.root);
    },
  });

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
                required={true}
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
