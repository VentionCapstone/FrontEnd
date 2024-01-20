import { Box, Checkbox, Typography } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import YandexMap from '@src/components/shared/YandexMap';
import { AccommodationReq } from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';
import { FormDateField } from './FormDateField';
import { FormField } from './FormField';

interface FormDateFieldProps {
  control: Control<AccommodationReq>;
  errors: FieldErrors<AccommodationReq>;
  latitudeWatch: number;
  longitudeWatch: number;
  handleCoordsChange: (coords: Coordinates) => void;
}

function FormFields({
  control,
  errors,
  latitudeWatch,
  longitudeWatch,
  handleCoordsChange,
}: FormDateFieldProps) {
  return (
    <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={4} py={4}>
      <FormField
        name="title"
        label="Title"
        control={control}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <FormField
        name="description"
        label="Description"
        control={control}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <FormDateField
        name="availableFrom"
        label="Available From"
        control={control}
        helperText={errors.availableFrom?.message}
      />
      <FormDateField
        name="availableTo"
        label="Available To"
        control={control}
        helperText={errors.availableTo?.message}
      />
      <FormField
        type="number"
        control={control}
        name="allowedNumberOfPeople"
        label="Allowed Number Of People"
        error={!!errors.allowedNumberOfPeople}
        helperText={errors.allowedNumberOfPeople?.message}
      />
      <FormField
        type="number"
        control={control}
        name="numberOfRooms"
        label="Number Of Rooms"
        error={!!errors.numberOfRooms}
        helperText={errors.numberOfRooms?.message}
      />
      <FormField
        type="number"
        control={control}
        name="price"
        label="Price"
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <FormField
        type="number"
        control={control}
        name="squareMeters"
        label="Square Meters"
        error={!!errors.squareMeters}
        helperText={errors.squareMeters?.message}
      />
      <FormField
        name="address.street"
        label="Street"
        control={control}
        error={!!errors.address?.street}
        helperText={errors.address?.street?.message}
      />
      <FormField
        name="address.city"
        label="City"
        control={control}
        error={!!errors.address?.city}
        helperText={errors.address?.city?.message}
      />
      <FormField
        name="address.country"
        label="Country"
        control={control}
        error={!!errors.address?.country}
        helperText={errors.address?.country?.message}
      />
      <FormField
        name="address.zipCode"
        label="Zip Code"
        control={control}
        error={!!errors.address?.zipCode}
        helperText={errors.address?.zipCode?.message}
      />
      <Box display={'flex'} columnGap={1} alignItems={'center'}>
        <Controller
          name="available"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              disableRipple
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <Typography variant="body1">Available</Typography>
      </Box>
      <Box sx={{ gridColumn: '1 / 3' }}>
        <YandexMap
          latitude={latitudeWatch}
          longitude={longitudeWatch}
          setCoords={handleCoordsChange}
        />
      </Box>
    </Box>
  );
}

export default FormFields;
