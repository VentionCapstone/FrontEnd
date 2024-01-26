import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, ImageList, ImageListItem, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useGetAllMediaQuery } from '@src/api/queries/media/useGetAllMediaQuery';

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
      <ImageListItem sx={{ width: '100%', height: '100%' }} key={index} cols={1} rows={1}>
        <img
          style={{ objectFit: 'fill', height: '100%' }}
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

        <Grid sx={{ height: '100%', margin: '0 auto' }}>
          {data && (
            <ImageList
              sx={isMobile ? { width: '20rem' } : { width: '40rem' }}
              variant="quilted"
              cols={1}
              rowHeight={isMobile ? 300 : 490}
            >
              <Slider
                itemsPerView={1}
                onStepChange={setCurrentIndex}
                activeStep={currentIndex}
                maxSteps={data.length}
                showIndicators={true}
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
