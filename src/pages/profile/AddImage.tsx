import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEventHandler } from 'react';
import toast from 'react-hot-toast';

import { AccountEditPersonalInfo, ToastMessages } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';
import { convertImageToBase64 } from '@src/utils';
import { useTranslation } from 'react-i18next';

function AddImage({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: Profile['imageUrl'];
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { t } = useTranslation();
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    convertImageToBase64(file)
      .then((imageBase64) => {
        setImageUrl(imageBase64);
      })
      .catch(() => toast.error(`${t(ToastMessages.ErrorImg)}`));
  };

  return (
    <Box width={'12rem'} position={'relative'} mx={{ xs: 'auto', md: 0 }} mb={6}>
      <Box
        src={imageUrl}
        component={'img'}
        sx={{
          width: '12rem',
          height: '12rem',
          bgcolor: 'primary.main',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      ></Box>

      <InputLabel
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          px: '1rem',
          py: '0.5rem',
          bgcolor: 'backgroundSecondary.main',
          borderRadius: '1rem',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
          transform: 'translate(-50%, 50%)',
          cursor: 'pointer',
        }}
        htmlFor="post-user-image"
      >
        <Stack direction={'row'} sx={{ gap: '0.25rem', alignItems: 'center' }}>
          <PhotoCameraIcon sx={{ fontSize: '1rem' }} />
          <Typography variant={'sm'} fontWeight={700}>
            {imageUrl
              ? `${t(AccountEditPersonalInfo.image_edit)}`
              : `${t(AccountEditPersonalInfo.image_add)}`}
          </Typography>
        </Stack>
      </InputLabel>

      <input
        onChange={handleChangeInput}
        type="file"
        id="post-user-image"
        accept="image/*"
        style={{ display: 'none' }}
      />
    </Box>
  );
}

export default AddImage;
