import AddIcon from '@mui/icons-material/Add';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Typography } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormEvent, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import useUploadMediaAccommodationMutation from '@src/api/mutations/accommodations/useUploadMediaAccommodationMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import {
  ACCEPT_UPLOAD_FILE_TYPE,
  MAX_UPLOAD_FILE_NUMBER,
  MINUMUM_UPLOAD_FILE_NUMBER,
} from '@src/constants';
import { uploadMediaStyles } from './styles';

function UploadMedia({
  accommodationId,
  setCurrentStep,
}: {
  accommodationId: string;
  setCurrentStep: (step: number) => void;
}) {
  const [images, setImages] = useState<ImageListType>([]);

  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { mutate, isPending } = useUploadMediaAccommodationMutation({
    accommodationId,
    images,
    setCurrentStep,
  });

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const handleNextButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const isNextButtonDisabled = images.length < MINUMUM_UPLOAD_FILE_NUMBER;

  return (
    <Box>
      <Box>
        <Typography
          variant={mobileScreen ? 'h6' : 'lg'}
          textAlign="center"
          mt={10}
          fontWeight={700}
        >
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
        dataURLKey="dataURL"
        maxNumber={MAX_UPLOAD_FILE_NUMBER}
        acceptType={ACCEPT_UPLOAD_FILE_TYPE}
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
                <Box sx={uploadMediaStyles.uploadContainer} {...dragProps}>
                  <PermMediaOutlinedIcon sx={uploadMediaStyles.uploadIcon} />
                  <Typography
                    variant={mobileScreen ? 'h6' : 'lg'}
                    textAlign="center"
                    fontWeight={600}
                    mt={3}
                  >
                    Drag & Drop your photos here
                  </Typography>
                  <Typography mb={5}>Choose at leat 5 images</Typography>
                  <Button onClick={onImageUpload}>Upload from your device</Button>
                </Box>
              )}
            </Box>

            <Box sx={uploadMediaStyles.listOfImagesContainer}>
              {imageList.map((image, index) => (
                <Box key={index} sx={uploadMediaStyles.imageContainer}>
                  <Box component={'img'} src={image.dataURL} sx={uploadMediaStyles.image} />
                  <Box sx={uploadMediaStyles.imageActionContainer}>
                    <IconButton
                      onClick={() => onImageRemove(index)}
                      sx={uploadMediaStyles.imageAction}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onImageUpdate(index)}
                      size="small"
                      sx={uploadMediaStyles.imageAction}
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
      <Box component="form" onClick={handleNextButtonClick} sx={uploadMediaStyles.mainButton}>
        <ButtonPrimary type="submit" disabled={isNextButtonDisabled} loading={isPending}>
          Next Step
        </ButtonPrimary>
      </Box>
    </Box>
  );
}

export default UploadMedia;
