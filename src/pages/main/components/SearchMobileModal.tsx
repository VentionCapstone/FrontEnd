import { SearchModalProps } from '@src/types/accommodation.types';
import { Box, Button, Fade, Modal } from '@mui/material';
import { pink } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import SearchInputLocation from './SearchInputLocation';
import CloseIcon from '@mui/icons-material/Close';
import { modalStyles } from './Modal.styles';
import SearchInputDatePicker from './SearchInputDatePicker';

export const SearchMobileModal = ({
  open,
  setOpen,
  setLocation,
  setCheckInDate,
  setCheckOutDate,
  searchParamsAsObject,
  handleSearchClick,
  localTimeToUtc,
  UtcTimeToLocal,
}: SearchModalProps) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleSearchModalClick = useCallback(() => {
    handleSearchClick();
    handleClose();
  }, [handleClose, handleSearchClick]);

  const handleCheckInChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      const localizedTime = localTimeToUtc(dayjs(newValue));
      setCheckInDate(newValue ? localizedTime.toISOString() : '');
      setCheckOutDate(newValue ? localTimeToUtc(newValue.add(1, 'day')).toISOString() : '');
    },
    [localTimeToUtc, setCheckInDate, setCheckOutDate]
  );

  const handleCheckOutChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      setCheckOutDate(newValue ? newValue.toISOString() : '');
    },
    [setCheckOutDate]
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={modalStyles.searchModalContainer}>
          <Button sx={modalStyles.searchCloseButton} onClick={handleClose}>
            <CloseIcon />
          </Button>
          <SearchInputLocation
            location={searchParamsAsObject['location']}
            setLocation={setLocation}
          />
          <SearchInputDatePicker
            isMobile={true}
            label={'Check-in'}
            date={searchParamsAsObject['checkInDate']}
            minDate={dayjs()}
            handleDateChange={handleCheckInChange}
            UtcTimeToLocal={UtcTimeToLocal}
          />
          <SearchInputDatePicker
            isMobile={true}
            label={'Check-out'}
            date={searchParamsAsObject['checkOutDate']}
            minDate={
              searchParamsAsObject['checkInDate']
                ? dayjs(searchParamsAsObject['checkInDate']).add(1, 'day')
                : dayjs()
            }
            handleDateChange={handleCheckOutChange}
            UtcTimeToLocal={UtcTimeToLocal}
          />

          <Button
            variant="contained"
            onClick={handleSearchModalClick}
            sx={{ backgroundColor: pink[500] }}
          >
            Search
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};