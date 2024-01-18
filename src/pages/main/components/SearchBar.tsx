import { Box, Button } from '@mui/material';
import { DefaultSearchParamsType, SearchBarProps } from '@src/types/accommodation.types';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/plugin/isSameOrBefore';
import 'dayjs/plugin/isSameOrAfter';
import { useCallback, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { mainStyles } from '../index.styles';
import SearchInputDatePicker from './SearchInputDatePicker';
import SearchInputLocation from './SearchInputLocation';
import { SearchMobileModal } from './SearchMobileModal';

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

  const handleCheckInChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
        setCheckInDate('');
        return;
      }
      const localizedcheckinTime = localTimeToUtc(dayjs(newValue));
      setCheckInDate(localizedcheckinTime.toISOString());
      console.log('!checkOutDate', !checkOutDate);
      if (!checkOutDate || checkInDate === checkOutDate) {
        setCheckOutDate(localizedcheckinTime.add(1, 'day').toISOString());
      }
    },
    [localTimeToUtc, searchParamsAsObject, setCheckInDate, setCheckOutDate]
  );

  const handleCheckOutChange = useCallback(
    (newValue: dayjs.Dayjs | null) => {
      if (!newValue) {
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
