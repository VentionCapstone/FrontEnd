import { Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import useGoogleSignInMutation from '@src/api/mutations/auth/useGoogleSignInMutation';
import i18n from '@src/i18n/i18n';
import { ErrorTypes } from '@src/types/i18n.types';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

const GoogleLoginButton = () => {
  const { mutate: googleLogin } = useGoogleSignInMutation();

  const handleGoogleLogin = useCallback(
    (token?: string) => {
      if (!token) {
        return;
      }
      googleLogin(token);
    },
    [googleLogin]
  );

  return (
    <Box display="flex" justifyContent="center" margin={4}>
      <GoogleLogin
        onSuccess={({ credential }) => {
          handleGoogleLogin(credential);
        }}
        onError={() => {
          toast.error(i18n.t(ErrorTypes.default));
        }}
        useOneTap
      />
    </Box>
  );
};

export default GoogleLoginButton;
