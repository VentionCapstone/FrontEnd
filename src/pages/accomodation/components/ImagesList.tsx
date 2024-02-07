import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';

import ShowPhotos from '@src/components/full-view-accommodation/full-view-accommodation';
import Slider from '@src/components/shared/Slider';
import { Media } from '@src/types/accommodation.types';
import { RenderedImage } from '@src/types/accommodationImages.types';
import { handleErrorInImage } from '@src/utils';
import { MAX_IMAGES, getImageSources } from '../utils/imagesListUtils';

export default function ImagesList({ images }: { images: Media[] }) {
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

  const formattedImages = useMemo(() => {
    return images.slice(0, MAX_IMAGES).map((image, index) => ({
      url: image.thumbnailUrl,
      cols: index === 0 ? 2 : 1,
      rows: index === 0 ? 4 : 2,
    }));
  }, [images]);

  function renderImageList(formattedImages: RenderedImage[], height: string) {
    return formattedImages.map((item, index) => {
      const { url, rows, cols } = item;

      return (
        <ImageListItem key={index} cols={cols} rows={rows} onClick={handleOpenDialog}>
          <Box
            component={'img'}
            sx={{
              objectFit: 'cover',
              cursor: 'pointer',
              height,
              width: '100%',
              borderRadius: { xs: 3, md: 0 },
            }}
            {...getImageSources({ url, rows, cols })}
            loading="lazy"
            onError={handleErrorInImage}
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
            {renderImageList(formattedImages, '350px')}
          </Slider>
          <ShowPhotos
            isMobile={isMobile}
            id={images[0].accommodationId}
            onClose={handleCloseDialog}
            onOpen={handleOpenDialog}
            open={openDialog}
          />
        </>
      ) : (
        <ImageList
          sx={{ width: '100%', height: '100%', position: 'relative', borderRadius: 3 }}
          variant="quilted"
          cols={4}
          rowHeight={100}
        >
          {renderImageList(formattedImages, '100%')}
          <ShowPhotos
            id={images[0].accommodationId}
            onClose={handleCloseDialog}
            onOpen={handleOpenDialog}
            open={openDialog}
          />
        </ImageList>
      )}
    </Box>
  );
}
