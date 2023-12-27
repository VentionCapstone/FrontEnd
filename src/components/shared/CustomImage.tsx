import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingImage from '../../assets/loader.png';
import ErrorImage from '../../assets/no-image.png';

const imageStates = {
  Loading: LoadingImage,
  Error: ErrorImage,
  Loaded: '',
};

type ImageState = keyof typeof imageStates;
type SingleImageProps = { image: string; name: string };

function CustomImage({ image, name }: SingleImageProps) {
  const [currentState, setCurrentState] = useState<ImageState>('Loading');

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
          width: imageStates[currentState] ? '80%' : '100%',
          objectFit: imageStates[currentState] ? 'contain' : 'cover',
          objectPosition: 'center',
          mx: 'auto',
          height: {
            xs: 270,
            sm: 320,
            md: 250,
            xl: 270,
          },
        },
      }}
    >
      <img src={imageStates[currentState] || image} alt={name} loading="lazy" />
    </Box>
  );
}

export default CustomImage;
