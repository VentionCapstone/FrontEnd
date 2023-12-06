import { Box, Divider, Stack, Typography } from '@mui/material';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';

const SignIn = () => {
  return (
    <Box sx={{ mx: 'auto', mt: '100px', border: '1px solid #b0b0b0', borderRadius: 2 }}>
      <Typography variant="subtitle1" align="center" margin={2} fontWeight="bold">
        Sign In
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">Please login</Typography>
        <form>
          <Stack direction="column" spacing={1}>
            <InputForm label="Email" placeholder="Email" />
            <InputForm label="Password" placeholder="Password" type="password" />
            <ButtonPrimary>Sign in</ButtonPrimary>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default SignIn;
