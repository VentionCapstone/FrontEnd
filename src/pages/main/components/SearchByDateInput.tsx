import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { SearchByDateInputProps } from '@src/types/accommodation.types';
import dayjs from 'dayjs';
import 'dayjs/plugin/isSameOrBefore';
import { mainStyles } from '../index.styles';

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
        textField: {
          size: 'small',
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
