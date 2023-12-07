import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

export const UserImage = () => {
  return (
    <Box width={'12rem'} position={'relative'} mx={{ xs: 'auto', md: 0 }}>
      <Box
        sx={{
          width: '12rem',
          height: '12rem',
          bgcolor: 'primary.main',
          borderRadius: '50%',
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
        <Stack direction={'row'} sx={{ gap: '0.5rem', alignItems: 'center' }}>
          <PhotoCameraIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
          <Typography variant={'sm'} fontWeight={700}>
            Edit
          </Typography>
        </Stack>
      </InputLabel>

      <input type="file" id="post-user-image" accept="image/*" style={{ display: 'none' }} />
    </Box>
  );
};
