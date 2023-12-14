import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { ChangeEventHandler } from 'react';
import { convertImageToBase64 } from '../../utils';

function AddImage({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    convertImageToBase64(file)
      .then((imageBase64) => {
        setImageUrl(imageBase64);
      })
      .catch((error) => console.log(error));
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
          bgcolor: 'white',
          borderRadius: '1rem',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
          transform: 'translate(-50%, 50%)',
          cursor: 'pointer',
        }}
        htmlFor="post-user-image"
      >
        <Stack direction={'row'} sx={{ gap: '0.25rem', alignItems: 'center' }}>
          <PhotoCameraIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
          <Typography variant={'sm'} fontWeight={700}>
            {imageUrl ? 'Edit' : 'Add'}
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
