import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Fade, Modal } from '@mui/material';
import { pink } from '@mui/material/colors';
import { DefaultSearchParamsType, SearchBarProps } from '@src/types/accommodation.types';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/plugin/isSameOrAfter';
import 'dayjs/plugin/isSameOrBefore';
import { useCallback, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { mainStyles } from '../index.styles';
import { modalStyles } from './Modal.styles';
import SearchInputDatePicker from './SearchInputDatePicker';
import SearchInputLocation from './SearchInputLocation';

export default function SearchBar({
  priceRange,
  setSearchParams,
  searchParamsAsObject,
}: SearchBarProps) {
  const [location, setLocation] = useState(searchParamsAsObject['location']);
  const [checkInDate, setCheckInDate] = useState(searchParamsAsObject['checkInDate']);
  const [checkOutDate, setCheckOutDate] = useState(searchParamsAsObject['checkOutDate']);
  const { minPeople, minRooms, minPrice, maxPrice, orderByPrice, orderByRoom, orderByPeople } =
    searchParamsAsObject;
  const { totalMaxPrice, totalMinPrice } = priceRange;

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const handleOpen = useCallback(() => setIsSearchModalOpen(true), []);
  const handleClose = useCallback(() => setIsSearchModalOpen(false), []);

  const timezoneOffset = dayjs().utcOffset();
  const localTimeToUtc = (value: Dayjs) => {
    const utcTime = dayjs(value).add(timezoneOffset, 'minute');
    return utcTime;
  };
  const UtcTimeToLocal = (value: Dayjs) => {
    const localTime = dayjs(value).subtract(timezoneOffset, 'minute');
    return localTime;
  };

  const handleSearchClick = useCallback(() => {
    const newSearchParamsAsObject: DefaultSearchParamsType = {
      minPrice: minPrice !== '0' ? minPrice : totalMinPrice.toString(),
      maxPrice: maxPrice !== '0' ? maxPrice : totalMaxPrice.toString(),
      minRooms: minRooms,
      minPeople: minPeople,
      orderByPrice: orderByPrice,
      orderByPeople: orderByPeople,
      orderByRoom: orderByRoom,
      location: location,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };
    const newSearchParams = new URLSearchParams(newSearchParamsAsObject);
    setSearchParams(newSearchParams);
  }, [location, checkInDate, checkOutDate]);

  const handleSearchModalClick = useCallback(() => {
    handleSearchClick();
    handleClose();
  }, [handleClose, handleSearchClick]);

  const handleCheckInChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
        setCheckInDate('');
        setCheckOutDate('');
        return;
      }
      const localizedcheckinTime = localTimeToUtc(dayjs(newValue));
      setCheckInDate(localizedcheckinTime.toISOString());
      if (!checkOutDate || checkInDate === checkOutDate) {
        setCheckOutDate(localizedcheckinTime.add(1, 'day').toISOString());
      }
    },
    [localTimeToUtc, searchParamsAsObject, setCheckInDate, setCheckOutDate]
  );

  const handleCheckOutChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
        setCheckInDate('');
        setCheckOutDate('');
        return;
      }
      const localizedcheckoutTime = localTimeToUtc(dayjs(newValue));
      setCheckOutDate(localizedcheckoutTime.toISOString());
      if (!checkInDate || checkInDate === checkOutDate) {
        setCheckInDate(localizedcheckoutTime.subtract(1, 'day').toISOString());
      }
    },
    [localTimeToUtc, setCheckOutDate]
  );

  const getCheckOutMinDate = useCallback(() => {
    return checkInDate ? dayjs(checkInDate).add(1, 'day') : dayjs().add(1, 'day');
  }, [checkInDate]);

  const getCheckInMinDate = useCallback(() => {
    const today: Dayjs = dayjs();
    const prevCheckIn: Dayjs = dayjs(checkInDate);
    if (today.isAfter(prevCheckIn, 'day')) {
      return today;
    }
    return today;
  }, [checkInDate]);

  const getCheckInMaxDate = useCallback(() => {
    if (!checkOutDate) {
      return;
    }
    return dayjs(checkOutDate).subtract(1, 'day');
  }, [checkOutDate]);

  return (
    <>
      <Box sx={mainStyles.searchDesktopContainer}>
        <SearchInputLocation location={location} setLocation={setLocation} />
        <SearchInputDatePicker
          isMobile={false}
          label={'Check-in'}
          date={checkInDate}
          minDate={getCheckInMinDate()}
          maxDate={getCheckInMaxDate()}
          handleDateChange={handleCheckInChange}
          UtcTimeToLocal={UtcTimeToLocal}
        />
        <SearchInputDatePicker
          isMobile={false}
          label={'Check-out'}
          date={checkOutDate}
          minDate={getCheckOutMinDate()}
          maxDate={undefined}
          handleDateChange={handleCheckOutChange}
          UtcTimeToLocal={UtcTimeToLocal}
        />

        <Button variant="contained" onClick={handleSearchClick} sx={mainStyles.searchButton}>
          <IoSearchSharp color={'#fce4ec'} size={20} />
        </Button>
      </Box>

      <Button variant="text" onClick={handleOpen} sx={mainStyles.mobileSearchBarButton}>
        Search
      </Button>

      {isSearchModalOpen && (
        <Modal open={isSearchModalOpen} onClose={handleClose}>
          <Fade in={isSearchModalOpen}>
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
                date={checkInDate}
                minDate={dayjs()}
                maxDate={getCheckInMaxDate()}
                handleDateChange={handleCheckInChange}
                UtcTimeToLocal={UtcTimeToLocal}
              />
              <SearchInputDatePicker
                isMobile={true}
                label={'Check-out'}
                date={checkOutDate}
                minDate={getCheckOutMinDate()}
                maxDate={undefined}
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
      )}
    </>
  );
}
