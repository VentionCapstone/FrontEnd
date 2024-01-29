import { GeoObject } from '@src/types/yandex_map.types';
import { useState } from 'react';
import MapView from './MapView';
import SearchLocation from './SearchLocation';

function SelectLocation() {
  const [address, setAddress] = useState<GeoObject | null>(null);
  return (
    <div>
      <SearchLocation address={address} setAddress={setAddress} />
      <MapView address={address} setAddress={setAddress} />
    </div>
  );
}

export default SelectLocation;
