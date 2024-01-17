import { Box, Button } from '@mui/material';
import SearchInputLocation from './SearchInputLocation';
import { mainStyles } from '../index.styles';
import dayjs from 'dayjs';
import { IoSearchSharp } from 'react-icons/io5';
import { SearchProps } from '@/types/accommodation.types';
import { useCallback } from 'react';
import SearchInputDatePicker from './SearchInputDatePicker';

export const SearchDesktop = ({
  setLocation,
  setCheckInDate,
  setCheckOutDate,
  searchParamsAsObject,
  handleSearchClick,
  localTimeToUtc,
  UtcTimeToLocal,
}: SearchProps) => {
  const handleCheckInChange = useCallback((newValue: dayjs.Dayjs | null) => {
    const localizedTime = localTimeToUtc(dayjs(newValue));
    setCheckInDate(newValue ? localizedTime.toISOString() : '');
    setCheckOutDate(newValue ? localTimeToUtc(newValue.add(1, 'day')).toISOString() : '');
  }, []);

  const handleCheckOutChange = useCallback((newValue: dayjs.Dayjs | null) => {
    setCheckOutDate(newValue ? newValue.toISOString() : '');
  }, []);

  return (
    <Box sx={mainStyles.searchDesktopContainer}>
      <SearchInputLocation location={searchParamsAsObject['location']} setLocation={setLocation} />
      <SearchInputDatePicker
        label={'Check-in'}
        date={searchParamsAsObject['checkInDate']}
        minDate={dayjs()}
        setDate={setCheckInDate}
        handleDateChange={handleCheckInChange}
        UtcTimeToLocal={UtcTimeToLocal}
      />
      <SearchInputDatePicker
        label={'Check-out'}
        date={searchParamsAsObject['checkOutDate']}
        minDate={
          searchParamsAsObject['checkInDate']
            ? dayjs(searchParamsAsObject['checkInDate']).add(1, 'day')
            : dayjs()
        }
        setDate={setCheckOutDate}
        handleDateChange={handleCheckOutChange}
        UtcTimeToLocal={UtcTimeToLocal}
      />

      <Button variant="contained" onClick={handleSearchClick} sx={mainStyles.searchButton}>
        <IoSearchSharp color={'#fce4ec'} size={20} />
      </Button>
    </Box>
  );
};
