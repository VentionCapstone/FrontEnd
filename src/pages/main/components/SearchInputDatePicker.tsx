import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { mainStyles } from '../index.styles';
import { SearchDatePickerProps } from '@src/types/accommodation.types';

const SearchInputDatePicker = ({
  isMobile,
  label,
  date,
  minDate,
  setDate,
  handleDateChange,
  UtcTimeToLocal,
}: SearchDatePickerProps) => {
  if (!isMobile) {
    return (
      <DatePicker
        label={label}
        sx={mainStyles.searchInput}
        slotProps={{
          field: {
            clearable: true,
            onClear: () => setDate(''),
            readOnly: true,
          },
          actionBar: {
            actions: ['clear'],
          },
        }}
        value={date !== '' ? UtcTimeToLocal(dayjs(date)) : null}
        minDate={minDate}
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
          onClear: () => setDate(''),
          readOnly: true,
        },
        actionBar: {
          actions: ['clear'],
        },
      }}
      value={date !== '' ? UtcTimeToLocal(dayjs(date)) : null}
      minDate={minDate}
      onChange={handleDateChange}
    />
  );
};

export default SearchInputDatePicker;
