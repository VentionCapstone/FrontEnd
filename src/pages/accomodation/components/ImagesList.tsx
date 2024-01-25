import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import ShowPhotos from '@src/components/full-view-accommodation/full-view-accommodation';
import Slider from '@src/components/shared/Slider';
import { AccommodationSingle } from '@src/types/accommodation.types';
import { useState } from 'react';

export default function ImagesList({ data }: { data: AccommodationSingle }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [image_1, image_2, image_3, image_4, image_5] = data.media;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);

  function cutImgUrl(url: string) {
    const parts = url.split('?');
    return parts[0];
  }

  const images = [
    {
      url: image_1.thumbnailUrl,
      cols: 2,
      rows: 4,
    },
    {
      url: image_2.thumbnailUrl,
      cols: 1,
      rows: 2,
    },
    {
      url: image_3.thumbnailUrl,
      cols: 1,
      rows: 2,
    },
    {
      url: image_4.thumbnailUrl,
      cols: 1,
      rows: 2,
    },
    {
      url: image_5.thumbnailUrl,
      cols: 1,
      rows: 2,
    },
  ];

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    const cuttedUrl = cutImgUrl(image);

    return {
      src: `${cuttedUrl}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${cuttedUrl}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  function renderImageList(images: { url: string; rows: number; cols: number }[]) {
    return images.map((item, index) => {
      const { url, rows, cols } = item;

      return (
        <ImageListItem key={index} cols={cols} rows={rows} onClick={handleOpenDialog}>
          <img
            style={{ borderRadius: 5, objectFit: 'cover', cursor: 'pointer' }}
            {...srcset(url, 121, rows, cols)}
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
            {renderImageList(images)}
          </Slider>
          <ShowPhotos
            isMobile={isMobile}
            id={data.id}
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
          {renderImageList(images)}
          <ShowPhotos
            id={data.id}
            onClose={handleCloseDialog}
            handleOpen={handleOpenDialog}
            open={openDialog}
          />
        </ImageList>
      )}
    </Box>
  );
}
