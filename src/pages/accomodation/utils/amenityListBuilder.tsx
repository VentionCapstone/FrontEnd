import {
  AcUnit,
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
import { AmenityList } from '../../../types/amenity.types';

export function buildAmenityList(amenities: string[]): AmenityList {
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
