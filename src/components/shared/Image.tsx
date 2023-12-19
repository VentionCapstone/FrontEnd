import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Error from '../../assets/no-image.png';

const defaultImage: Record<'Error' | 'Loaded', string> = {
  Error,
  Loaded: '',
};

function SingleImage({ image, name = 'image' }: { image: string; name?: string }) {
  const [currentState, setCurrentState] = useState<keyof typeof defaultImage>('Error');

  useEffect(() => {
    const imageNew = new Image();
    imageNew.src = image;
    imageNew.onload = () => {
      setCurrentState('Loaded');
    };
    imageNew.onerror = () => {
      setCurrentState('Error');
    };
  }, [image]);

  return (
    <Box
      sx={{
        'transition': 'transform 0.5s ease',
        '&:hover': { transform: 'scale(1.1)' },
        '& img': {
          width: defaultImage[currentState] ? '80%' : '100%',
          objectFit: defaultImage[currentState] ? 'contain' : 'cover',
          objectPosition: 'center',
          marginX: 'auto',
          minHeight: {
            sm: 260,
            md: 250,
            xl: 270,
          },
        },
      }}
    >
      <img src={defaultImage[currentState] || image} alt={name} loading="lazy" />
    </Box>
  );
}

export default SingleImage;
