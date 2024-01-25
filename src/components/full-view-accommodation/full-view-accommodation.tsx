import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, ImageList, ImageListItem, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { UseGetAllMediaQuery } from '@src/api/queries/media/useGetAllMediaQuery';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
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
  const { data } = UseGetAllMediaQuery(id);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, (data?.length ?? 0) - 1));
  }, [data]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  React.useEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
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
    window.addEventListener('keydown', handleKeyDown as () => void);

    return () => {
      window.removeEventListener('keydown', handleKeyDown as () => void);
    };
  }, [currentIndex, handleNext, handlePrev]);

  return (
    <React.Fragment>
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

        <Grid sx={{ height: '100%', margin: '0 auto' }}>
          {data && (
            <ImageList
              sx={{ height: '100%', margin: '0 auto' }}
              variant="quilted"
              cols={1}
              rowHeight={'auto'}
            >
              <ImageListItem
                key={data[currentIndex].id}
                sx={{ Maxheight: '50%', maxWidth: '80%', margin: '10px auto' }}
              >
                <img src={data[currentIndex].imageUrl} loading="lazy" />
              </ImageListItem>
            </ImageList>
          )}

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
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
