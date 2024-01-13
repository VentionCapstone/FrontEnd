import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import { DATE_FORMAT } from '@src/constants';
import { AccommodationFields, AccommodationReq } from '@src/types/accommodation.types';

type FormFieldProps = {
  label: string;
  helperText?: string;
  name: AccommodationFields;
  control: Control<AccommodationReq>;
};

export const FormDateField = memo(({ name, label, control, helperText }: FormFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label={label}
          format={DATE_FORMAT}
          helperText={helperText}
          value={dayjs(field.value)}
          onChange={(newValue) => field.onChange(dayjs(newValue))}
        />
      </LocalizationProvider>
    )}
  />
));

FormDateField.displayName = 'FormField';
