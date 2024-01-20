import { TextField } from '@mui/material';
import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import { AccommodationFields, AccommodationReq } from '@src/types/accommodation.types';

type FormFieldProps = {
  label: string;
  error: boolean;
  type?: 'text' | 'number';
  helperText?: string;
  name: AccommodationFields;
  control: Control<AccommodationReq>;
};

export const FormField = memo(
  ({ name, label, control, type = 'text', error, helperText }: FormFieldProps) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          error={error}
          helperText={helperText}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            field.onChange(type === 'number' ? Number(e.target.value) : e.target.value)
          }
        />
      )}
    />
  )
);

FormField.displayName = 'FormField';
