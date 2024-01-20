import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { useCreateAccommodation } from '@src/api/mutations/accommodations/useCreateAccommodation';
import {
  AccommodationReq,
  AccommodationStepType,
  accommodationSchema,
} from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';
import FormFields from './components/FormFields';

function AccommodationForm({ setCurrentStep }: AccommodationStepType) {
  const { mutate: createAccommodation } = useCreateAccommodation({ setCurrentStep });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AccommodationReq>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      title: '',
      description: '',
      allowedNumberOfPeople: 1,
      availableFrom: String(new Date()),
      availableTo: String(new Date(dayjs().add(1, 'week').toDate())),
      numberOfRooms: 1,
      available: true,
      price: 1,
      squareMeters: 1,
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '',
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const latitudeWatch = watch('address.latitude');
  const longitudeWatch = watch('address.longitude');

  const onSubmit = (data: AccommodationReq) => {
    createAccommodation({
      ...data,
      availableFrom: dayjs(data.availableFrom).toISOString(),
      availableTo: dayjs(data.availableTo).toISOString(),
    });
    return;
  };

  const handleCoordsChange = ([latitude, longitude]: Coordinates) => {
    setValue('address.latitude', latitude, {
      shouldDirty: true,
    });
    setValue('address.longitude', longitude, {
      shouldDirty: true,
    });
  };
  return (
    <Box>
      <Typography variant="h4" textAlign="center" pb={4}>
        Create Accommodation
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields
          control={control}
          errors={errors}
          latitudeWatch={latitudeWatch}
          longitudeWatch={longitudeWatch}
          handleCoordsChange={handleCoordsChange}
        />
        <Box display="flex" justifyContent={'flex-end'}>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Next Step
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
}

export default AccommodationForm;
