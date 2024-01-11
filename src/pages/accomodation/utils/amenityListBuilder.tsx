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

import { AmenitySetting } from '@/types/amenity.types';

const amenitiesSettings: {
  [key: string]: AmenitySetting;
} = {
  isQuiteArea: {
    id: 'isQuiteArea',
    name: 'Quite Area',
    icon: <VolumeOff />,
  },
  hasWifi: {
    id: 'hasWifi',
    name: 'Wifi',
    icon: <Wifi />,
  },
  isChildFriendly: {
    id: 'isChildFriendly',
    name: 'Child Friendly',
    icon: <ChildFriendly />,
  },
  isCloseToCenter: {
    id: 'isCloseToCenter',
    name: 'Close To Center',
    icon: <LocationCity />,
  },
  hasAirConditioning: {
    id: 'hasAirConditioning',
    name: 'Air Conditioning',
    icon: <AcUnit />,
  },
  hasAirportTransfer: {
    id: 'hasAirportTransfer',
    name: 'Airport Transfer',
    icon: <ConnectingAirports />,
  },
  hasBackyard: {
    id: 'hasBackyard',
    name: 'Backyard',
    icon: <Grass />,
  },
  hasHospitalNearby: {
    id: 'hasHospitalNearby',
    name: 'Hospital Nearby',
    icon: <LocalHospital />,
  },
  hasKitchen: {
    id: 'hasKitchen',
    name: 'Kitchen',
    icon: <Kitchen />,
  },
  hasLaundryService: {
    id: 'hasLaundryService',
    name: 'Laundry Service',
    icon: <LocalLaundryService />,
  },
  hasParking: {
    id: 'hasParking',
    name: 'Parking',
    icon: <LocalParking />,
  },
  hasPetAllowance: {
    id: 'hasPetAllowance',
    name: 'Pet Allowance',
    icon: <Pets />,
  },
  hasSmokingAllowance: {
    id: 'hasSmokingAllowance',
    name: 'Smoking Allowance',
    icon: <SmokingRooms />,
  },
  hasSwimmingPool: {
    id: 'hasSwimmingPool',
    name: 'Swimming Pool',
    icon: <Pool />,
  },
  hasTv: {
    id: 'hasTv',
    name: 'Tv',
    icon: <Tv />,
  },
};

export function buildAmenityList(amenities: string[]): AmenitySetting[] {
  const amenityList: AmenitySetting[] = [];

  amenities.forEach((amenity) => {
    const amenitySetting: AmenitySetting = amenitiesSettings[amenity];
    if (amenitySetting) {
      amenityList.push(amenitySetting);
    }
  });

  return amenityList;
}
