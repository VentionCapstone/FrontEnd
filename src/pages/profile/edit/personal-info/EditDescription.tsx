import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { getProfile } from '@src/stores/slices/authSlice';
import { AccountEditPersonalInfo } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';

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
        {i18n.t(AccountEditPersonalInfo.about_desc)}
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
        {i18n.t(AccountEditPersonalInfo.save_name)}
      </Button>
    </>
  );
};

export default Description;
