import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Profile } from '../../../types/profile.types';

function UserFullName({
  register,
  errors,
}: {
  register: UseFormRegister<Profile>;
  errors: FieldErrors<Profile>;
}) {
  return (
    <Box>
      <Typography fontWeight={600} mb={{ xs: 3, md: 4 }}>
        Legal name
      </Typography>

      <Stack rowGap={3} columnGap={4} direction={{ md: 'row' }}>
        <Box width={'100%'}>
          <TextField
            {...register('firstName', {
              required: 'This field is required',
            })}
            fullWidth
            size="small"
            label="First name"
          />
          {errors.firstName && (
            <Typography variant={'xs'} mt={1} color={'error.main'}>
              {errors.firstName.message}
            </Typography>
          )}
        </Box>

        <Box width={'100%'}>
          <TextField
            {...register('lastName', { required: 'This field is required' })}
            fullWidth
            size="small"
            label="Last name"
          />
          {errors.lastName && (
            <Typography variant={'xs'} mt={1} color={'error.main'}>
              {errors.lastName.message}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default UserFullName;
