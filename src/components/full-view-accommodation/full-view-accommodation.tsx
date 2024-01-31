import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, ImageList, ImageListItem, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { UseGetAllMediaQuery } from '@src/api/queries/media/useGetAllMediaQuery';
import { EditAccommodation } from '@src/types/i18n.types';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Slider from '../shared/Slider';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface ShowPhotosProps {
  id: string;
  open: boolean;
  onClose: () => void;
  handleOpen: () => void;
  isMobile?: boolean;
}

export default function ShowPhotos({ id, open, onClose, handleOpen, isMobile }: ShowPhotosProps) {
  const { data } = useGetAllMediaQuery(id, open);
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, (data?.length ?? 0) - 1));
  }, [data]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const dialogElement = dialogRef.current as HTMLDivElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    dialogElement?.addEventListener('keydown', handleKeyDown as () => void);

    return () => {
      dialogElement?.removeEventListener('keydown', handleKeyDown as () => void);
    };
  }, [currentIndex, handleNext, handlePrev]);

  const renderImages = () => {
    return data?.map((item, index) => (
      <ImageListItem sx={{ width: '100%', height: '70vh' }} key={index} cols={1} rows={1}>
        <img
          style={{ objectFit: 'contain', height: '80vh', width: '100vw' }}
          src={item.imageUrl}
          alt={`photo-${index}`}
          loading="lazy"
        />
      </ImageListItem>
    ));
  };

  return (
    <>
      {!isMobile && (
        <Button
          variant="contained"
          color="inherit"
          onClick={handleOpen}
          sx={{ position: 'absolute', right: '3%', bottom: '10%' }}
        >
          Show all photos
        </Button>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        ref={dialogRef}
      >
        {t(EditAccommodation.ShowAllImages)}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>

        <Toolbar>
          <IconButton
            edge="start"
            sx={{ marginLeft: '1rem' }}
            color="inherit"
            onClick={(e) => handleClose(e)}
            aria-label="close"
          >
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" sx={{ marginLeft: 2, flex: 1 }} textAlign={'center'}>
            {currentIndex + 1} / {data?.length ?? 0}
          </Typography>
        </Toolbar>

        <Grid
          sx={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          {data && (
            <ImageList
              sx={
                isMobile
                  ? { width: '100vw' }
                  : {
                      width: '80vw',
                      height: '100vh',
                      marginTop: '15rem',
                    }
              }
              variant="quilted"
              cols={1}
              rowHeight={'auto'}
            >
              <Slider
                itemsPerView={1}
                onStepChange={setCurrentIndex}
                activeStep={currentIndex}
                maxSteps={data.length}
              >
                {renderImages()}
              </Slider>
            </ImageList>
          )}
          {!isMobile && (
            <>
              <IconButton
                sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
                color="inherit"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                color="inherit"
                onClick={handleNext}
                disabled={currentIndex === (data?.length ?? 0) - 1}
              >
                <ArrowForwardIos />
              </IconButton>
            </>
          )}
        </Grid>
      </Dialog>
    </>
  );
}
