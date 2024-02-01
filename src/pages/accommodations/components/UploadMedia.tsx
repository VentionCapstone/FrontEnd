import AddIcon from '@mui/icons-material/Add';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Typography } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormEvent, useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import useUploadMediaAccommodationMutation from '@src/api/mutations/accommodations/useUploadMediaAccommodationMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import {
  ACCEPT_UPLOAD_FILE_TYPE,
  MAX_UPLOAD_FILE_NUMBER,
  MINUMUM_UPLOAD_FILE_NUMBER,
} from '@src/constants';
import { CreateAccommodationRoute } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { uploadMediaStyles } from './styles';

function UploadMedia({
  accommodationId,
  handleSearchParamsChange,
}: {
  accommodationId: string;
  handleSearchParamsChange: (params: URLSearchParams) => void;
}) {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageListType>([]);

  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { mutate, isPending, isSuccess } = useUploadMediaAccommodationMutation({
    accommodationId,
    images,
  });

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  useEffect(() => {
    if (isSuccess) {
      handleSearchParamsChange(
        new URLSearchParams({ currentStep: '3', accommodationId: accommodationId })
      );
    }
  }, [isSuccess, accommodationId, handleSearchParamsChange]);

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
          {t(CreateAccommodationRoute.add_image_title)}
        </Typography>
        <Typography
          variant="sm"
          mt={2}
          textAlign="center"
          color={'secondary2.main'}
          fontWeight={700}
        >
          {t(CreateAccommodationRoute.add_image_desc)}
        </Typography>
      </Box>

      {isPending && <LoadingPrimary height="60vh" />}

      {!isPending && (
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
                  <Box sx={uploadMediaStyles.availableImageContainer}>
                    <Typography mt={2}>{t(CreateAccommodationRoute.five_images)}</Typography>
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
                      {t(CreateAccommodationRoute.drag_drop)}
                    </Typography>
                    <Typography mb={5}>{t(CreateAccommodationRoute.five_images)}</Typography>
                    <Button onClick={onImageUpload}>
                      {t(CreateAccommodationRoute.upload_btn)}
                    </Button>
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
      )}

      <Box component="form" onClick={handleNextButtonClick} sx={uploadMediaStyles.mainButton}>
        <ButtonPrimary type="submit" disabled={isNextButtonDisabled} loading={isPending}>
          {t(CreateAccommodationRoute.next_btn)}
        </ButtonPrimary>
      </Box>
    </Box>
  );
}

export default UploadMedia;
