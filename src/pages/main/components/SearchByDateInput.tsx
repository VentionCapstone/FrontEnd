import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { mainStyles } from '../index.styles';
import { SearchByDateInputProps } from '@src/types/accommodation.types';
import 'dayjs/plugin/isSameOrBefore';

const SearchByDateInput = ({
  isMobile,
  label,
  date,
  minDate,
  maxDate,
  handleDateChange,
  UtcTimeToLocal,
}: SearchByDateInputProps) => {
  if (!isMobile) {
    return (
      <DatePicker
        label={label}
        sx={mainStyles.searchInput}
        slotProps={{
          field: {
            clearable: true,
            readOnly: true,
          },
          actionBar: {
            actions: ['clear'],
          },
        }}
        value={date !== '' ? UtcTimeToLocal(dayjs(date)) : null}
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleDateChange}
        disableHighlightToday
      />
    );
  }

  return (
    <MobileDatePicker
      label={label}
      sx={mainStyles.searchInput}
      slotProps={{
        field: {
          clearable: true,
          readOnly: true,
        },
        actionBar: {
          actions: ['clear'],
        },
      }}
      value={date !== '' ? UtcTimeToLocal(dayjs(date)) : null}
      minDate={minDate}
      maxDate={maxDate}
      onChange={handleDateChange}
      disableHighlightToday
    />
  );
};

export default SearchByDateInput;