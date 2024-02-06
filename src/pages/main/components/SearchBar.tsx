import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/plugin/isSameOrAfter';
import 'dayjs/plugin/isSameOrBefore';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@src/assets/logo.png';
import { PROJECT_NAME } from '@src/constants';
import { DefaultSearchParamsType, SearchBarProps } from '@src/types/accommodation.types';
import { SearchTexts } from '@src/types/i18n.types';
import { mainStyles } from '../index.styles';
import { modalStyles } from './Modal.styles';
import SearchByCityInput from './SearchByCityInput';
import SearchByDateInput from './SearchByDateInput';

export default function SearchBar({
  priceRange,
  setSearchParams,
  searchParamsAsObject,
}: SearchBarProps) {
  const { t } = useTranslation();
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
  const localTimeToUtc = useCallback(
    (value: Dayjs) => {
      const utcTime = dayjs(value).add(timezoneOffset, 'minute');
      return utcTime;
    },
    [timezoneOffset]
  );
  const UtcTimeToLocal = useCallback(
    (value: Dayjs) => {
      const localTime = dayjs(value).subtract(timezoneOffset, 'minute');
      return localTime;
    },
    [timezoneOffset]
  );

  const handleSearch = useCallback(() => {
    const newSearchParamsAsObject: DefaultSearchParamsType = {
      minPrice: minPrice || totalMinPrice.toString(),
      maxPrice: maxPrice || totalMaxPrice.toString(),
      minRooms: minRooms || '0',
      minPeople: minPeople || '0',
      orderByPrice: orderByPrice || 'any',
      orderByPeople: orderByPeople || 'any',
      orderByRoom: orderByRoom || 'any',
      location: location || '',
      checkInDate: checkInDate || '',
      checkOutDate: checkOutDate || '',
    };

    const newSearchParams = new URLSearchParams(newSearchParamsAsObject);
    setSearchParams(newSearchParams);
  }, [
    minPrice,
    totalMinPrice,
    maxPrice,
    totalMaxPrice,
    minRooms,
    minPeople,
    orderByPrice,
    orderByPeople,
    orderByRoom,
    location,
    checkInDate,
    checkOutDate,
    setSearchParams,
  ]);

  useEffect(() => {
    handleSearch();
  }, [location, checkOutDate, handleSearch]);

  const handleSearchModalClick = useCallback(() => {
    handleSearch();
    handleClose();
  }, [handleClose, handleSearch]);

  const handleCheckInChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
        setCheckInDate('');
        setCheckOutDate('');
        handleSearch();
        return;
      }
      const localizedcheckinTime = localTimeToUtc(dayjs(newValue));
      setCheckInDate(localizedcheckinTime.toISOString());
      if (!checkOutDate || checkInDate === checkOutDate) {
        setCheckOutDate(localizedcheckinTime.add(1, 'day').toISOString());
      }
    },
    [checkInDate, checkOutDate, localTimeToUtc, handleSearch]
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
    [checkInDate, checkOutDate, localTimeToUtc]
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
        <SearchByCityInput location={location} setLocation={setLocation} />
        <SearchByDateInput
          isMobile={false}
          label={t(SearchTexts.input_date_label_checkin)}
          date={checkInDate}
          minDate={getCheckInMinDate()}
          maxDate={getCheckInMaxDate()}
          handleDateChange={handleCheckInChange}
          UtcTimeToLocal={UtcTimeToLocal}
        />
        <SearchByDateInput
          isMobile={false}
          label={t(SearchTexts.input_date_label_checkout)}
          date={checkOutDate}
          minDate={getCheckOutMinDate()}
          maxDate={undefined}
          handleDateChange={handleCheckOutChange}
          UtcTimeToLocal={UtcTimeToLocal}
        />
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mr: 'auto' }}>
        <Box
          src={logo}
          component={'img'}
          sx={{ width: '1.75rem', height: '1.75rem', objectFit: 'contain' }}
        />

        <Typography
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
            fontWeight: 800,
            color: 'secondary.main',
            lineHeight: '1rem',
          }}
        >
          {PROJECT_NAME}
        </Typography>
      </Box>

      <Button variant="text" onClick={handleOpen} sx={mainStyles.mobileSearchBarButton}>
        <SearchIcon sx={{ fontSize: '1.35rem' }} />
      </Button>

      {isSearchModalOpen && (
        <Modal open={isSearchModalOpen} onClose={handleClose}>
          <Fade in={isSearchModalOpen}>
            <Box sx={modalStyles.modalContainer}>
              <Stack padding={5}>
                <Button sx={modalStyles.searchCloseButton} onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </Stack>

              <Box flexGrow={1} px={5}>
                <SearchByCityInput location={location} setLocation={setLocation} />

                <Stack direction={'row'} gap={2} mt={6}>
                  <SearchByDateInput
                    isMobile={true}
                    label={t(SearchTexts.input_date_label_checkin)}
                    date={checkInDate}
                    minDate={dayjs()}
                    maxDate={getCheckInMaxDate()}
                    handleDateChange={handleCheckInChange}
                    UtcTimeToLocal={UtcTimeToLocal}
                  />
                  <SearchByDateInput
                    isMobile={true}
                    label={t(SearchTexts.input_date_label_checkout)}
                    date={checkOutDate}
                    minDate={getCheckOutMinDate()}
                    maxDate={undefined}
                    handleDateChange={handleCheckOutChange}
                    UtcTimeToLocal={UtcTimeToLocal}
                  />
                </Stack>
              </Box>

              <Box padding={5}>
                <Button
                  variant="contained"
                  onClick={handleSearchModalClick}
                  sx={{
                    'bgcolor': 'secondary.main',
                    ':hover': { bgcolor: 'secondary.dark' },
                  }}
                  fullWidth
                >
                  {t(SearchTexts.search_button)}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
