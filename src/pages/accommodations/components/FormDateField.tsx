import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
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
        <DatePicker
          label={label}
          format={DATE_FORMAT}
          slotProps={{
            textField: {
              helperText: helperText,
            },
          }}
          value={typeof field.value === 'string' ? dayjs(field.value) : null}
          disablePast
          onChange={(newValue) => field.onChange(newValue?.format(DATE_FORMAT))}
        />
      </LocalizationProvider>
    )}
  />
));

FormDateField.displayName = 'FormField';
