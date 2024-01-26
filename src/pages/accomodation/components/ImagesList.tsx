import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import ShowPhotos from '@src/components/full-view-accommodation/full-view-accommodation';
import Slider from '@src/components/shared/Slider';
import { Media } from '@src/types/accommodation.types';
import { renderedImageType } from '@src/types/accommodationImages.types';
import { useState } from 'react';
import { getImageSources } from '../utils/imagesListUtils';

export default function ImagesList({ imagesData }: { imagesData: Media[] }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState(0);

  const images = imagesData.slice(0, 5).map((image, index) => ({
    url: image.thumbnailUrl,
    cols: index === 0 ? 2 : 1,
    rows: index === 0 ? 4 : 2,
  }));

  function renderImageList(images: renderedImageType[], height: string) {
    return images.map((item, index) => {
      const { url, rows, cols } = item;

      return (
        <ImageListItem key={index} cols={cols} rows={rows} onClick={handleOpenDialog}>
          <img
            style={{ borderRadius: 5, objectFit: 'cover', cursor: 'pointer', height }}
            {...getImageSources({ url, rows, cols })}
            loading="lazy"
          />
        </ImageListItem>
      );
    });
  }
  return (
    <Box>
      {isMobile ? (
        <>
          <Slider
            itemsPerView={1}
            onStepChange={setActiveStep}
            activeStep={activeStep}
            maxSteps={5}
            showIndicators={true}
          >
            {renderImageList(images, '350px')}
          </Slider>
          <ShowPhotos
            isMobile={isMobile}
            id={imagesData[0].accommodationId}
            onClose={handleCloseDialog}
            handleOpen={handleOpenDialog}
            open={openDialog}
          />
        </>
      ) : (
        <ImageList
          sx={{ width: '100%', height: '100%', position: 'relative' }}
          variant="quilted"
          cols={4}
          rowHeight={100}
        >
          {renderImageList(images, '100%')}
          <ShowPhotos
            id={imagesData[0].accommodationId}
            onClose={handleCloseDialog}
            handleOpen={handleOpenDialog}
            open={openDialog}
          />
        </ImageList>
      )}
    </Box>
  );
}
