import { Box, Checkbox, Typography } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import YandexMap from '@src/components/shared/YandexMap';
import { AccommodationReq } from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';
import { CreateAccommodationRoute } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        '.MuiInputBase-root': {
          borderRadius: '40px',
          border: 'none',
        },
        'display': 'flex',
        'flexDirection': 'column',
        'gap': '1rem',
        'width': '100%',
      }}
    >
      <Box>
        <Typography variant="h6" mb={4}>
          {t(CreateAccommodationRoute.basic_info)}
        </Typography>
        <Box
          sx={{
            'display': 'flex',
            'flexWrap': 'wrap',
            'gap': '1rem',
            '& > div': {
              width: {
                xs: '100%',
                md: '45%',
                lg: '49%',
              },
            },
          }}
        >
          <FormField
            name="title"
            label={t(CreateAccommodationRoute.title_input)}
            control={control}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <FormField
            name="description"
            label={t(CreateAccommodationRoute.desc_input)}
            control={control}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={4}>
          {t(CreateAccommodationRoute.availability)}
        </Typography>
        <Box
          sx={{
            'display': 'flex',
            'flexWrap': 'wrap',
            'gap': '1rem',
            '& > div': {
              width: {
                xs: '47%',
                md: '30%',
                lg: '32%',
              },
            },
          }}
        >
          <FormDateField
            name="availableFrom"
            label={t(CreateAccommodationRoute.available_from)}
            control={control}
            helperText={errors.availableFrom?.message}
          />
          <FormDateField
            name="availableTo"
            label={t(CreateAccommodationRoute.available_to)}
            control={control}
            helperText={errors.availableTo?.message}
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
            <Typography variant="body1"> {t(CreateAccommodationRoute.available)}</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={4}>
          {t(CreateAccommodationRoute.details)}
        </Typography>
        <Box
          sx={{
            'display': 'flex',
            'flexWrap': 'wrap',
            'gap': '1rem',
            '& > div': {
              width: {
                xs: '47%',
                md: '22%',
                lg: '20%',
              },
            },
          }}
        >
          <FormField
            type="number"
            control={control}
            name="allowedNumberOfPeople"
            label={t(CreateAccommodationRoute.allowed_people)}
            error={!!errors.allowedNumberOfPeople}
            helperText={errors.allowedNumberOfPeople?.message}
          />
          <FormField
            type="number"
            control={control}
            name="numberOfRooms"
            label={t(CreateAccommodationRoute.number_rooms)}
            error={!!errors.numberOfRooms}
            helperText={errors.numberOfRooms?.message}
          />
          <FormField
            type="number"
            control={control}
            name="price"
            label={t(CreateAccommodationRoute.price)}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <FormField
            type="number"
            control={control}
            name="squareMeters"
            label={t(CreateAccommodationRoute.sq_meter)}
            error={!!errors.squareMeters}
            helperText={errors.squareMeters?.message}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mb={4}>
          {t(CreateAccommodationRoute.address)}
        </Typography>
        <Box
          sx={{
            'display': 'flex',
            'flexWrap': 'wrap',
            'gap': '1rem',
            '& > div': {
              width: {
                xs: '100%',
                sm: '47%',
                md: '47%',
                lg: '24%',
              },
            },
          }}
        >
          <FormField
            name="address.country"
            label={t(CreateAccommodationRoute.country)}
            control={control}
            error={!!errors.address?.country}
            helperText={errors.address?.country?.message}
          />
          <FormField
            name="address.city"
            label={t(CreateAccommodationRoute.city)}
            control={control}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
          />
          <FormField
            name="address.street"
            label={t(CreateAccommodationRoute.street)}
            control={control}
            error={!!errors.address?.street}
            helperText={errors.address?.street?.message}
          />
          <FormField
            name="address.zipCode"
            label={t(CreateAccommodationRoute.zip_code)}
            control={control}
            error={!!errors.address?.zipCode}
            helperText={errors.address?.zipCode?.message}
          />
        </Box>
      </Box>

      <Box mt={5}>
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
