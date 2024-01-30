import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useRef, useState } from 'react';

import useGetSelectedAddress from '@src/api/queries/accommodation/useGetSelectedAddress';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@src/constants';
import { MapMouseEvent, MapViewType } from '@src/types/yandex_map.types';
import { parseCoord } from '@src/utils';

const MapView = ({ address, setAddress, handleCoordsChange, addressWatch }: MapViewType) => {
  const map = useRef<ymaps.Map>();
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (map.current && address) {
      const coords = parseCoord(address.Point.pos);
      void map.current.setCenter(coords, 15, {});
    }
  }, [address]);

  const { data } = useGetSelectedAddress(selectedLocation);

  useEffect(() => {
    if (data) {
      setAddress(data);
    }
  }, [data, setAddress]);

  const handleDragEnd = (event: MapMouseEvent) => {
    const coord = event.originalEvent.target.geometry.getCoordinates();
    setSelectedLocation(coord);
    handleCoordsChange(coord);
  };

  const checkCoordinates = () => {
    return addressWatch.latitude > 0 && addressWatch.longitude > 0;
  };

  return (
    <>
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
              : [DEFAULT_LATITUDE, DEFAULT_LONGITUDE],
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
                : [DEFAULT_LATITUDE, DEFAULT_LONGITUDE]
            }
            properties={{
              balloonContent: address ? address.name : 'Select location',
            }}
            options={{
              draggable: true,
            }}
            onDragEnd={(e: MapMouseEvent) => handleDragEnd(e)}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          />
        </Map>
      </YMaps>
    </>
  );
};

export default MapView;
