import { DefaultSearchParamsType, SearchBarProps } from '@src/types/accommodation.types';
import { Box, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { mainStyles } from '../index.styles';
import SearchInputDatePicker from './SearchInputDatePicker';
import SearchInputLocation from './SearchInputLocation';
import { SearchMobileModal } from './SearchMobileModal';

export default function SearchBar({
  defaultSearchParams,
  setSearchParams,
  searchParamsAsObject,
}: SearchBarProps) {
  const [location, setLocation] = useState(searchParamsAsObject['location']);
  const [checkInDate, setCheckInDate] = useState(searchParamsAsObject['checkInDate']);
  const [checkOutDate, setCheckOutDate] = useState(searchParamsAsObject['checkOutDate']);

  useEffect(() => {
    console.log('location', location);
    console.log('checkInDate', checkInDate);
    console.log('checkOutDate', checkOutDate);
  }, [location, checkInDate, checkOutDate]);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const handleOpen = useCallback(() => setIsSearchModalOpen(true), []);

  const timezoneoffset = dayjs().utcOffset();
  const localTimeToUtc = (value: Dayjs) => {
    const utcTime = dayjs(value).add(timezoneoffset, 'minute');
    return utcTime;
  };
  const UtcTimeToLocal = (value: Dayjs) => {
    const localTime = dayjs(value).subtract(timezoneoffset, 'minute');
    return localTime;
  };

  const handleSearchClick = useCallback(() => {
    const newSearchParamsAsObject: DefaultSearchParamsType = {
      ...defaultSearchParams,
      location: location,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };
    if ((checkInDate !== '' && checkOutDate == '') || (checkInDate == '' && checkOutDate !== '')) {
      alert('Search cannot be performed with only one date specified');
      return;
    }
    if (dayjs(checkOutDate).isBefore(dayjs(checkInDate), 'day')) {
      alert('Check-out date cannot be after the check-in date');
      return;
    }
    if (dayjs(checkOutDate).isSame(dayjs(checkInDate), 'day')) {
      alert('Check-out date cannot be same as the check-in date');
      return;
    }
    if (
      dayjs(checkInDate).isBefore(dayjs(), 'day') ||
      dayjs(checkOutDate).isBefore(dayjs(), 'day')
    ) {
      alert('Please do not select past dates');
      return;
    }
    const newSearchParams = new URLSearchParams(newSearchParamsAsObject);
    setSearchParams(newSearchParams);
  }, [location, checkInDate, checkOutDate]);

  const handleCheckInChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
        setCheckInDate('');
        return;
      }
      console.log('checkINdateBeforechange', newValue.toISOString());
      const localizedcheckinTime = localTimeToUtc(dayjs(newValue));
      console.log('checkINdateAfterchange', localizedcheckinTime.toISOString());
      setCheckInDate(localizedcheckinTime.toISOString());

      const prevCheckoutDate: Dayjs = dayjs(searchParamsAsObject['checkOutDate']);
      console.log('prevCheckoutDate', prevCheckoutDate);
      if (prevCheckoutDate?.isAfter(localizedcheckinTime)) {
        console.log('checkoutdate is okay');
        return;
      }
      setCheckOutDate(localizedcheckinTime.add(1, 'day').toISOString());
    },
    [localTimeToUtc, searchParamsAsObject, setCheckInDate, setCheckOutDate]
  );

  const handleCheckOutChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
        setCheckOutDate('');
        return;
      }
      console.log('checkOUTdateBeforechange', newValue.toISOString());
      const localizedcheckoutTime = localTimeToUtc(dayjs(newValue));
      console.log('checkOUTdateAfterchange', localizedcheckoutTime.toISOString());
      setCheckOutDate(localizedcheckoutTime.toISOString());
    },
    [localTimeToUtc, setCheckOutDate]
  );

  const getCheckOutMinDate = useCallback(() => {
    return searchParamsAsObject['checkInDate']
      ? dayjs(searchParamsAsObject['checkInDate']).add(1, 'day')
      : dayjs();
  }, [searchParamsAsObject]);

  const getCheckInMinDate = useCallback(() => {
    const today: Dayjs = dayjs();
    const prevCheckIn: Dayjs = dayjs(searchParamsAsObject['checkInDate']);
    if (today.isAfter(prevCheckIn, 'day')) {
      return today;
    }
    return today;
  }, [searchParamsAsObject]);

  return (
    <>
      <Box sx={mainStyles.searchDesktopContainer}>
        <SearchInputLocation location={location} setLocation={setLocation} />
        <SearchInputDatePicker
          isMobile={false}
          label={'Check-in'}
          date={checkInDate}
          minDate={getCheckInMinDate()}
          setDate={setCheckInDate}
          handleDateChange={handleCheckInChange}
          UtcTimeToLocal={UtcTimeToLocal}
        />
        <SearchInputDatePicker
          isMobile={false}
          label={'Check-out'}
          date={checkOutDate}
          minDate={getCheckOutMinDate()}
          setDate={setCheckOutDate}
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
        <SearchMobileModal
          open={isSearchModalOpen}
          setOpen={setIsSearchModalOpen}
          setLocation={setLocation}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
          searchParamsAsObject={searchParamsAsObject}
          handleSearchClick={handleSearchClick}
          localTimeToUtc={localTimeToUtc}
          UtcTimeToLocal={UtcTimeToLocal}
        />
      )}
    </>
  );
}
