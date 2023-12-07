import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
import { Chip, Button } from '@mui/material';

type EditAmenitiesProps = {
  accomodationId: string;
  isNew: boolean;
};

type AmenityList = {
  id: string;
  name: string;
  icon: any;
  added?: boolean;
}[];

export default function EditAmenities({ accomodationId, isNew }: EditAmenitiesProps) {
  const [currentAmenities, setCurrentAmenities] = useState<AmenityList | undefined>(undefined);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState<string>('');

  const { data: amenities } = useQuery({
    queryKey: ['amenities_list'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/amenities/list`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNjFlYjc0Mi05ODY2LTQ1ZjgtYTI1MS0zNTE2OTFhNTY1ODciLCJlbWFpbCI6Im1pcmFicm9yOTU0NUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMTg3MDYxMCwiZXhwIjoxNzAyNDc1NDEwfQ.rd2-j81ElBP-Xyk-YjU_mRqQNmObUO2rkudMboxq5_M`,
        },
      });
      const data = await res.json();
      return buildAmenityList(data.data);
    },
  });

  const { data: accomodationAmenities } = useQuery({
    queryKey: ['accomodation_amenities', accomodationId],
    queryFn: async () => {
      if (isNew) return [];

      const res = await fetch(`${import.meta.env.VITE_API_URL}/amenities/${accomodationId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNjFlYjc0Mi05ODY2LTQ1ZjgtYTI1MS0zNTE2OTFhNTY1ODciLCJlbWFpbCI6Im1pcmFicm9yOTU0NUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMTg3MzUxOSwiZXhwIjoxNzAyNDc4MzE5fQ.mWE_3feK5qG5wjshdT0QsXXrfoyKfsfTAAsq6IpdQFo`,
        },
      });
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    if (accomodationAmenities && amenities) {
      const otherAmenities = accomodationAmenities.otherAmenities.trim()
        ? accomodationAmenities.otherAmenities.split(',')
        : [];

      setCurrentAmenities(
        amenities.map((amenity) => ({
          ...amenity,
          added: accomodationAmenities[amenity.id],
        }))
      );

      setOtherAmenities(otherAmenities);
    }
  }, [accomodationAmenities, amenities]);

  const handleSelect = (id: string) => {
    if (currentAmenities) {
      const updatedAmenities = currentAmenities.map((amenity) =>
        amenity.id === id ? { ...amenity, added: !amenity.added } : amenity
      );
      setCurrentAmenities(updatedAmenities);
    }
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim()) {
      if (customAmenity.includes(',')) {
        alert('Amenity cannot contain commas');
        return;
      }

      const exists = otherAmenities?.find((amenity) => amenity === customAmenity);

      if (!exists) {
        setOtherAmenities((prev) => [...prev, customAmenity]);
        setCustomAmenity('');
      } else {
        alert('Amenity already exists');
      }
    }
  };

  const saveAmenities = async () => {
    let amenitiesToSave = currentAmenities?.reduce(
      (acc, amenity) => {
        acc[amenity.id] = Boolean(amenity.added);
        return acc;
      },
      { otherAmenities: otherAmenities.join(',') } as { [key: string]: boolean | string }
    );

    if (isNew) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/amenities/${accomodationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNjFlYjc0Mi05ODY2LTQ1ZjgtYTI1MS0zNTE2OTFhNTY1ODciLCJlbWFpbCI6Im1pcmFicm9yOTU0NUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMTg3MzUxOSwiZXhwIjoxNzAyNDc4MzE5fQ.mWE_3feK5qG5wjshdT0QsXXrfoyKfsfTAAsq6IpdQFo`,
        },
        body: JSON.stringify(amenitiesToSave),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/amenities/${accomodationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNjFlYjc0Mi05ODY2LTQ1ZjgtYTI1MS0zNTE2OTFhNTY1ODciLCJlbWFpbCI6Im1pcmFicm9yOTU0NUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcwMTg3MzUxOSwiZXhwIjoxNzAyNDc4MzE5fQ.mWE_3feK5qG5wjshdT0QsXXrfoyKfsfTAAsq6IpdQFo`,
        },
        body: JSON.stringify(amenitiesToSave),
      });
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <section>
      <h2>Amenities</h2>
      {accomodationAmenities && currentAmenities ? (
        <ul>
          {currentAmenities.map((amenity) => (
            <li key={amenity.id}>
              <Chip
                label={amenity.name}
                icon={<amenity.icon />}
                variant={amenity.added ? 'filled' : 'outlined'}
                color="primary"
                onClick={() => handleSelect(amenity.id)}
              />
            </li>
          ))}
          {otherAmenities.map((amenity) => (
            <li key={amenity}>
              <Chip
                label={amenity}
                icon={<Check />}
                variant="filled"
                color="primary"
                onDelete={() => {
                  setOtherAmenities((prev) => prev.filter((a) => a !== amenity));
                }}
              />
            </li>
          ))}
          <li>
            <input
              type="text"
              placeholder="Add custom amenity"
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
            />
            <Button onClick={addCustomAmenity}>Add</Button>
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <Button onClick={saveAmenities}>Save amenities</Button>
    </section>
  );
}

function buildAmenityList(amenities: string[]): AmenityList {
  const amenityList: AmenityList = [];

  amenities.forEach((amenity) => {
    switch (amenity) {
      case 'isQuiteArea':
        amenityList.push({ id: 'isQuiteArea', name: 'Quite Area', icon: VolumeOff });
        break;
      case 'hasWifi':
        amenityList.push({ id: 'hasWifi', name: 'Wifi', icon: Wifi });
        break;
      case 'isChildFriendly':
        amenityList.push({ id: 'isChildFriendly', name: 'Child Friendly', icon: ChildFriendly });
        break;
      case 'isCloseToCenter':
        amenityList.push({ id: 'isCloseToCenter', name: 'Close To Center', icon: LocationCity });
        break;
      case 'hasAirConditioning':
        amenityList.push({ id: 'hasAirConditioning', name: 'Air Conditioning', icon: AcUnit });
        break;
      case 'hasAirportTransfer':
        amenityList.push({
          id: 'hasAirportTransfer',
          name: 'Airport Transfer',
          icon: ConnectingAirports,
        });
        break;
      case 'hasBackyard':
        amenityList.push({ id: 'hasBackyard', name: 'Backyard', icon: Grass });
        break;
      case 'hasHospitalNearby':
        amenityList.push({
          id: 'hasHospitalNearby',
          name: 'Hospital Nearby',
          icon: LocalHospital,
        });
        break;
      case 'hasKitchen':
        amenityList.push({ id: 'hasKitchen', name: 'Kitchen', icon: Kitchen });
        break;
      case 'hasLaundryService':
        amenityList.push({
          id: 'hasLaundryService',
          name: 'Laundry Service',
          icon: LocalLaundryService,
        });
        break;
      case 'hasParking':
        amenityList.push({ id: 'hasParking', name: 'Parking', icon: LocalParking });
        break;
      case 'hasPetAllowance':
        amenityList.push({ id: 'hasPetAllowance', name: 'Pet Allowance', icon: Pets });
        break;
      case 'hasSmokingAllowance':
        amenityList.push({
          id: 'hasSmokingAllowance',
          name: 'Smoking Allowance',
          icon: SmokingRooms,
        });
        break;
      case 'hasSwimmingPool':
        amenityList.push({ id: 'hasSwimmingPool', name: 'Swimming Pool', icon: Pool });
        break;
      case 'hasTv':
        amenityList.push({ id: 'hasTv', name: 'Tv', icon: Tv });
        break;
    }
  });

  return amenityList;
}
