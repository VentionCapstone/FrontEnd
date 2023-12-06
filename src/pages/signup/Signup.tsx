import { Box, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';

const Signup = () => {
  return (
    <Box sx={{ mx: 'auto', mt: '100px', border: '1px solid #b0b0b0', borderRadius: 2 }}>
      <Typography variant="subtitle1" align="center" margin={2} fontWeight="bold">
        Sign up
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">Welcome to Airbnb</Typography>
        <form>
          <Stack direction="column" spacing={1}>
            <InputForm label="Email" placeholder="Email" />
            <InputForm label="Password" placeholder="Password" type="password" />
            <InputForm label="Confirm Password" placeholder="Confirm Password" type="password" />
            <ButtonPrimary>Sign up</ButtonPrimary>
          </Stack>
        </form>
        <Typography variant="subtitle2" align="center" color="gray">
          if you already have an account, please{' '}
          <Link to="/auth/signin" style={{ fontWeight: 'bold' }}>
            login
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;
