import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useCallback, useEffect, useRef, useState } from 'react';

import useGetSelectedAddress from '@src/api/queries/accommodation/useGetSelectedAddress';
import { DEFAULT_COORDINATES } from '@src/constants';
import { MapMouseEvent, MapViewType } from '@src/types/yandex_map.types';
import { parseCoord } from '@src/utils';
import DataFetchError from './DataFetchError';

const MapView = ({ address, setAddress, handleCoordsChange, addressWatch }: MapViewType) => {
  const map = useRef<ymaps.Map>();
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([0, 0]);

  const { data, isError } = useGetSelectedAddress(selectedLocation);

  useEffect(() => {
    if (map.current && address) {
      const coords = parseCoord(address.Point.pos);
      void map.current.setCenter(coords, 15, {});
    }
  }, [address]);

  useEffect(() => {
    if (data) {
      setAddress(data);
    }
  }, [data, setAddress]);

  const handleDragEnd = useCallback(
    (event: MapMouseEvent) => {
      const coord = event.originalEvent.target.geometry.getCoordinates();
      setSelectedLocation(coord);
      handleCoordsChange(coord);
    },
    [handleCoordsChange]
  );

  const checkCoordinates = useCallback(() => {
    return addressWatch.latitude > 0 && addressWatch.longitude > 0;
  }, [addressWatch]);

  if (isError) {
    return <DataFetchError />;
  }

  return (
    <YMaps
      query={{
        apikey: import.meta.env.VITE_YANDEX_API_KEY as string,
        load: 'package.full',
        lang: 'en_US',
      }}
    >
      <Map
        state={{
          zoom: 15,
          center: checkCoordinates()
            ? [addressWatch.latitude, addressWatch.longitude]
            : DEFAULT_COORDINATES,
          controls: [],
        }}
        height={400}
        width={'100%'}
        instanceRef={map}
      >
        <Placemark
          geometry={
            checkCoordinates()
              ? [addressWatch.latitude, addressWatch.longitude]
              : DEFAULT_COORDINATES
          }
          properties={{
            balloonContent: address ? address.name : 'Select location',
          }}
          options={{
            draggable: true,
          }}
          onDragEnd={handleDragEnd}
          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        />
      </Map>
    </YMaps>
  );
};

export default MapView;
