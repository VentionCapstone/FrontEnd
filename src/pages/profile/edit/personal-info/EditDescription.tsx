import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useEditAccountMutation from '@/api/mutations/account/useEditAccountMutation';
import { useAppSelector } from '@/hooks/redux-hooks';
import { getProfile } from '@/stores/slices/authSlice';
import { Profile } from '@/types/profile.types';

const Description = ({
  collapsePanel,
  initialDescription,
}: {
  collapsePanel: () => void;
  initialDescription: Profile['description'] | undefined;
}) => {
  const profileId = useAppSelector(getProfile)?.id ?? '';
  const { mutate } = useEditAccountMutation(profileId);

  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = () => {
    if (description && description !== initialDescription) {
      mutate({ description });
    }

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        Tell us a little bit about yourself, so your future hosts or guests can get to know you.
      </Typography>

      <Box mt={{ xs: 2, md: 4 }} mb={6}>
        <TextField
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth
          multiline
          minRows={2}
          maxRows={6}
        />
      </Box>

      <Button
        onClick={handleSubmit}
        variant={'contained'}
        size="small"
        sx={{ display: 'block', fontWeight: 600, ml: 'auto' }}
      >
        Save
      </Button>
    </>
  );
};

export default Description;
