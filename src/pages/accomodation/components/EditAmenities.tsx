import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  AcUnit,
  Check,
  ChildFriendly,
  ConnectingAirports,
  Grass,
  Kitchen,
  LocalHospital,
  LocalLaundryService,
  LocalParking,
  LocationCity,
  Pets,
  Pool,
  SmokingRooms,
  Tv,
  VolumeOff,
  Wifi,
} from '@mui/icons-material';
import { Button, Typography, Box, List, ListItem, TextField } from '@mui/material';
import httpClient from '../../../api/httpClient';
import LoadingPrimary from '../../../components/LoadingPrimary';
import CustomChip from './CustomChip';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import {
  AccommodationAmenitiesResponse,
  AmenityList,
  AmenityListResponse,
  EditAmenitiesProps,
  EditAmenitiesResponse,
} from '../../../types/amenity.types';

export default function EditAmenities({ accomodationId, isNew }: EditAmenitiesProps) {
  const [isNewAccomodation, setIsNewAccomodation] = useState<boolean>(isNew);
  const [currentAmenities, setCurrentAmenities] = useState<AmenityList | undefined>(undefined);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState<string>('');

  // get all predefined amenities
  const { data: amenities } = useQuery({
    queryKey: ['amenities_list'],
    queryFn: async () => {
      const { data } = await httpClient.get<AmenityListResponse>('/amenities/list');
      return buildAmenityList(data.data);
    },
  });

  // get all amenities for this accomodation
  const {
    data: accomodationAmenities,
    isError,
    error,
  } = useQuery({
    queryKey: ['accomodation_amenities', accomodationId, isNewAccomodation],
    queryFn: async () => {
      if (isNewAccomodation) return {};

      const { data } = await httpClient.get<AccommodationAmenitiesResponse>(
        `/amenities/${accomodationId}`
      );
      return data.data;
    },
    retry: 0,
  });

  // if there is no amenity list on this accomodation
  useEffect(() => {
    if (isError) {
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

  const handleSelect = (id: string) => {
    if (currentAmenities) {
      const updatedAmenities = currentAmenities.map((amenity) =>
        amenity.id === id ? { ...amenity, added: !amenity.added } : amenity
      );
      setCurrentAmenities(updatedAmenities);
    }
  };

  const addCustomAmenity = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  // create or update amenities
  const saveAmenities = async () => {
    const amenitiesToSave = currentAmenities?.reduce(
      (acc, amenity) => {
        acc[amenity.id] = Boolean(amenity.added);
        return acc;
      },
      { otherAmenities: otherAmenities.join(',') } as { [key: string]: boolean | string }
    );

    let data;

    if (isNewAccomodation) {
      ({ data } = await httpClient.post<EditAmenitiesResponse>(
        `/amenities/${accomodationId}`,
        amenitiesToSave
      ));
    } else {
      ({ data } = await httpClient.put<EditAmenitiesResponse>(
        `/amenities/${accomodationId}`,
        amenitiesToSave
      ));
    }

    toast.success(data.message);
  };

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
                    onDelete={() => {
                      setOtherAmenities((prev) => prev.filter((a) => a !== amenity));
                    }}
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

function buildAmenityList(amenities: string[]): AmenityList {
  const amenityList: AmenityList = [];

  amenities.forEach((amenity) => {
    switch (amenity) {
      case 'isQuiteArea':
        amenityList.push({ id: 'isQuiteArea', name: 'Quite Area', icon: <VolumeOff /> });
        break;
      case 'hasWifi':
        amenityList.push({ id: 'hasWifi', name: 'Wifi', icon: <Wifi /> });
        break;
      case 'isChildFriendly':
        amenityList.push({
          id: 'isChildFriendly',
          name: 'Child Friendly',
          icon: <ChildFriendly />,
        });
        break;
      case 'isCloseToCenter':
        amenityList.push({
          id: 'isCloseToCenter',
          name: 'Close To Center',
          icon: <LocationCity />,
        });
        break;
      case 'hasAirConditioning':
        amenityList.push({ id: 'hasAirConditioning', name: 'Air Conditioning', icon: <AcUnit /> });
        break;
      case 'hasAirportTransfer':
        amenityList.push({
          id: 'hasAirportTransfer',
          name: 'Airport Transfer',
          icon: <ConnectingAirports />,
        });
        break;
      case 'hasBackyard':
        amenityList.push({ id: 'hasBackyard', name: 'Backyard', icon: <Grass /> });
        break;
      case 'hasHospitalNearby':
        amenityList.push({
          id: 'hasHospitalNearby',
          name: 'Hospital Nearby',
          icon: <LocalHospital />,
        });
        break;
      case 'hasKitchen':
        amenityList.push({ id: 'hasKitchen', name: 'Kitchen', icon: <Kitchen /> });
        break;
      case 'hasLaundryService':
        amenityList.push({
          id: 'hasLaundryService',
          name: 'Laundry Service',
          icon: <LocalLaundryService />,
        });
        break;
      case 'hasParking':
        amenityList.push({ id: 'hasParking', name: 'Parking', icon: <LocalParking /> });
        break;
      case 'hasPetAllowance':
        amenityList.push({ id: 'hasPetAllowance', name: 'Pet Allowance', icon: <Pets /> });
        break;
      case 'hasSmokingAllowance':
        amenityList.push({
          id: 'hasSmokingAllowance',
          name: 'Smoking Allowance',
          icon: <SmokingRooms />,
        });
        break;
      case 'hasSwimmingPool':
        amenityList.push({ id: 'hasSwimmingPool', name: 'Swimming Pool', icon: <Pool /> });
        break;
      case 'hasTv':
        amenityList.push({ id: 'hasTv', name: 'Tv', icon: <Tv /> });
        break;
    }
  });

  return amenityList;
}
