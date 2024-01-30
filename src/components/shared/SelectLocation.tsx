import { AddressWatchType, SelectAddress } from '@src/types/accommodation.types';
import { GeoObject } from '@src/types/yandex_map.types';
import { useState } from 'react';
import MapView from './MapView';
import SearchLocation from './SearchLocation';

type SelectLocationType = {
  handleCoordsChange: (coords: [number, number]) => void;
  handleAddressChange: (address: SelectAddress) => void;
  addressWatch: AddressWatchType;
};

function SelectLocation({
  handleCoordsChange,
  handleAddressChange,
  addressWatch,
}: SelectLocationType) {
  const [address, setAddress] = useState<GeoObject | null>(null);

  return (
    <>
      <SearchLocation
        address={address}
        setAddress={setAddress}
        handleCoordsChange={handleCoordsChange}
        handleAddressChange={handleAddressChange}
        addressWatch={addressWatch}
      />
      <MapView
        address={address}
        setAddress={setAddress}
        handleCoordsChange={handleCoordsChange}
        handleAddressChange={handleAddressChange}
        addressWatch={addressWatch}
      />
    </>
  );
}

export default SelectLocation;
