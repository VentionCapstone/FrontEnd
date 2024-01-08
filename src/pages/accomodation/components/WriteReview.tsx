import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const WriteReview = () => {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={4}>
        <Box
          sx={{
            width: '6rem',
            height: '6rem',
            bgcolor: 'secondary2.light',
            borderRadius: '50%',
          }}
        ></Box>

        <Stack>
          <Typography variant={'lg'} fontWeight={600}>
            Jeremiah
          </Typography>

          <Rating size={'large'} />
        </Stack>
      </Stack>
    </>
  );
};
