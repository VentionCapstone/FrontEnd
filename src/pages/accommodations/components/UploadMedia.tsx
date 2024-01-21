import AddIcon from '@mui/icons-material/Add';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import httpClient from '@src/api/httpClient';
import ButtonPrimary from '@src/components/button/ButtonPrimary';

const maxNumber: number = 20;

function UploadMedia({
  accommodationId,
  setCurrentStep,
}: {
  accommodationId: string;
  setCurrentStep: (step: number) => void;
}) {
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append('images', image.file as File);
      });

      await httpClient.post(`accommodations/${accommodationId}/file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      setCurrentStep(3);
    },
  });

  const isNextButtonDisabled = images.length < 5;
  const handleNextButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box>
      <Box>
        <Typography variant="lg" textAlign="center" mt={10} fontWeight={700}>
          Add some photos of your house
        </Typography>
        <Typography
          variant="sm"
          mt={2}
          textAlign="center"
          color={'secondary2.main'}
          fontWeight={700}
        >
          You will need 5 photos to get started. You can add more or make changes later.
        </Typography>
      </Box>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="dataURL"
        acceptType={['jpg', 'gif', 'png']}
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
          <>
            <Box textAlign={'center'}>
              {images.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    columnGap: 2,
                    mt: 4,
                  }}
                >
                  <Typography mt={2}>Choose at least 5 images</Typography>
                  <IconButton onClick={onImageUpload}>
                    <AddIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '50%',
                    mx: 'auto',
                    border: '1px dashed',
                    borderColor: 'secondary2.light',
                    height: '400px',
                    mt: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  {...dragProps}
                >
                  <PermMediaOutlinedIcon sx={{ fontSize: 50, color: 'secondary2.main' }} />
                  <Typography variant="lg" textAlign="center" fontWeight={600} mt={3}>
                    Drag & Drop your photos here
                  </Typography>
                  <Typography mb={5}>Choose at leat 5 images</Typography>
                  <Button onClick={onImageUpload}>Upload from your device</Button>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                width: '50%',
                mx: 'auto',
                mt: 10,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 2,
              }}
            >
              {imageList.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    maxWidth: '300px',
                    maxHeight: '250px',
                    position: 'relative',
                  }}
                >
                  <Box
                    component={'img'}
                    src={image.dataURL}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '3%',
                      right: '3%',
                    }}
                  >
                    <IconButton
                      onClick={() => onImageRemove(index)}
                      sx={{
                        'backgroundColor': 'secondary2.light',
                        'mr': 2,
                        '&:hover': {
                          backgroundColor: 'secondary2.main',
                          color: 'secondary2.light',
                        },
                      }}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onImageUpdate(index)}
                      size="small"
                      sx={{
                        'backgroundColor': 'secondary2.light',
                        '&:hover': {
                          backgroundColor: 'secondary2.main',
                          color: 'secondary2.light',
                        },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </ImageUploading>
      <Box
        component="form"
        onClick={handleNextButtonClick}
        sx={{
          ml: 'auto',
          marginTop: 2,
          width: '10%',
        }}
      >
        <ButtonPrimary disabled={isNextButtonDisabled} loading={isPending}>
          Next Step
        </ButtonPrimary>
      </Box>
    </Box>
  );
}

export default UploadMedia;
