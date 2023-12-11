import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Typography, Box, List, ListItem, TextField } from '@mui/material';
import { Check } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import LoadingPrimary from '../../../components/LoadingPrimary';
import CustomChip from './CustomChip';
import { Amenities, AmenityList, EditAmenitiesProps } from '../../../types/amenity.types';
import { useGetAmenityList } from '../../../api/queries/amenity/useGetAmenityList';
import { useGetAccomodationAmenities } from '../../../api/queries/amenity/useGetAccomodationAmenities';
import { useSaveAmenities } from '../../../api/mutations/amenity/useSaveAmenities';

export default function EditAmenities({ accomodationId, isNew }: EditAmenitiesProps) {
  const [isNewAccomodation, setIsNewAccomodation] = useState<boolean>(isNew);
  const [currentAmenities, setCurrentAmenities] = useState<AmenityList | undefined>(undefined);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState<string>('');

  // get all predefined amenities
  const { data: amenities } = useGetAmenityList();

  // get all amenities for this accomodation
  const {
    data: accomodationAmenities,
    isError,
    error,
  } = useGetAccomodationAmenities({ accomodationId, isNewAccomodation });

  // save amenities
  const { mutate } = useSaveAmenities(accomodationId);

  // if there is no amenity list on this accomodation
  useEffect(() => {
    if (isError && error) {
      const { response } = error as AxiosError;
      if (response?.status === 404) {
        setIsNewAccomodation(true);
      }
    }
  }, [isError, error]);

  // set current amenities
  useEffect(() => {
    if (accomodationAmenities && amenities) {
      const otherAmenitiesStr = accomodationAmenities.otherAmenities as string;
      const otherAmenities = otherAmenitiesStr?.trim() ? otherAmenitiesStr.split(',') : [];

      setCurrentAmenities(
        amenities.map((amenity) => ({
          ...amenity,
          added: accomodationAmenities[amenity.id] as boolean,
        }))
      );

      setOtherAmenities(otherAmenities);
    }
  }, [accomodationAmenities, amenities, isNewAccomodation]);

  const handleSelect = useCallback(
    (id: string) => {
      if (currentAmenities) {
        const updatedAmenities = currentAmenities.map((amenity) =>
          amenity.id === id ? { ...amenity, added: !amenity.added } : amenity
        );
        setCurrentAmenities(updatedAmenities);
      }
    },
    [currentAmenities]
  );

  const addCustomAmenity = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (customAmenity.trim()) {
        if (customAmenity.includes(',')) {
          toast.error('Amenity cannot contain commas');
          return;
        }

        const exists = otherAmenities?.find((amenity) => amenity === customAmenity);

        if (!exists) {
          setOtherAmenities((prev) => [...prev, customAmenity]);
          setCustomAmenity('');
        } else {
          toast.error('Amenity already exists');
        }
      }
    },
    [customAmenity, otherAmenities]
  );

  const removeCustomAmenity = useCallback(
    (amenity: string) => () => {
      setOtherAmenities((prev) => prev.filter((a) => a !== amenity));
    },
    []
  );

  // create or update amenities
  const saveAmenities = useCallback(() => {
    const amenitiesToSave = currentAmenities?.reduce(
      (acc, amenity) => {
        acc[amenity.id] = Boolean(amenity.added);
        return acc;
      },
      { otherAmenities: otherAmenities.join(',') } as Amenities
    );

    if (!amenitiesToSave) {
      toast.error('No amenities to save');
      return;
    }

    mutate({ amenitiesToSave, isNewAccomodation });
  }, [currentAmenities, mutate, isNewAccomodation, otherAmenities]);

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '10px',
      }}
    >
      <Typography variant="h4" component="h2">
        {isNewAccomodation ? 'Add amenities' : 'Edit amenities'}
      </Typography>
      <Box
        sx={{
          maxWidth: '700px',
          flexGrow: 1,
          gap: '10px',
        }}
      >
        {accomodationAmenities && currentAmenities ? (
          <>
            <List
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {currentAmenities.map((amenity) => (
                <ListItem
                  key={amenity.id}
                  sx={{
                    width: 'fit-content',
                    display: 'block',
                  }}
                >
                  <CustomChip
                    label={amenity.name}
                    icon={amenity.icon}
                    selected={amenity.added}
                    handleSelect={() => handleSelect(amenity.id)}
                  />
                </ListItem>
              ))}
              {otherAmenities.map((amenity) => (
                <ListItem
                  key={amenity}
                  sx={{
                    width: 'fit-content',
                    display: 'block',
                  }}
                >
                  <CustomChip
                    label={amenity}
                    icon={<Check />}
                    selected={true}
                    onDelete={removeCustomAmenity(amenity)}
                  />
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <form onSubmit={addCustomAmenity}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginTop: '10px',
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Add custom amenity"
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    sx={{
                      outline: 'none',
                    }}
                  />
                  <Button variant="outlined" color="secondary" type="submit">
                    Add
                  </Button>
                </Box>
              </form>
            </Box>
          </>
        ) : (
          <LoadingPrimary />
        )}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: '100px',
          padding: '10px 20px',
          fontWeight: 'bold',
          mt: '20px',
        }}
        onClick={() => void saveAmenities()}
      >
        Save amenities
      </Button>
    </Box>
  );
}
