import { useState } from 'react';

import { GeoObject, SelectLocationProps } from '@src/types/yandex_map.types';

import MapView from './MapView';
import SearchLocation from './SearchLocation';

function SelectLocation({ onCoordsChange, onAddressChange, addressWatch }: SelectLocationProps) {
  const [address, setAddress] = useState<GeoObject | null>(null);

  return (
    <>
      <SearchLocation
        address={address}
        setAddress={setAddress}
        onCoordsChange={onCoordsChange}
        onAddressChange={onAddressChange}
        addressWatch={addressWatch}
      />
      <MapView
        address={address}
        setAddress={setAddress}
        onCoordsChange={onCoordsChange}
        addressWatch={addressWatch}
        onAddressChange={onAddressChange}
      />
    </>
  );
}

export default SelectLocation;
