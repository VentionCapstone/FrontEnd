import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useGetSelectedAddress from '@src/api/queries/accommodation/useGetSelectedAddress';
import {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  PROJECT_NAME,
  YANDEX_MAP_CONTROL,
  YANDEX_MAP_QUERY,
} from '@src/constants';
import { Coordinates } from '@src/types/global.types';
import { MapMouseEvent, MapViewProps } from '@src/types/yandex_map.types';
import { parseCoord } from '@src/utils';
import DataFetchError from './DataFetchError';

const MapView = ({ address, setAddress, onCoordsChange, addressWatch }: MapViewProps) => {
  const map = useRef<ymaps.Map>();
  const [selectedLocation, setSelectedLocation] = useState<Coordinates>([0, 0]);

  const { data, isError } = useGetSelectedAddress(selectedLocation);

  useEffect(() => {
    if (map.current && address) {
      const coords = parseCoord(address.Point.pos) ?? DEFAULT_COORDINATES;
      void map.current.setCenter(coords, DEFAULT_ZOOM, {});
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
      onCoordsChange(coord);
    },
    [onCoordsChange]
  );

  const checkCoordinates = useMemo(() => {
    return addressWatch.latitude !== 0 && addressWatch.longitude !== 0;
  }, [addressWatch.latitude, addressWatch.longitude]);

  const coordinates: Coordinates = useMemo(() => {
    return [addressWatch.latitude, addressWatch.longitude];
  }, [addressWatch.latitude, addressWatch.longitude]);

  if (isError) {
    return <DataFetchError />;
  }

  return (
    <YMaps query={YANDEX_MAP_QUERY}>
      <Map
        state={{
          zoom: DEFAULT_ZOOM,
          center: checkCoordinates ? coordinates : DEFAULT_COORDINATES,
          controls: YANDEX_MAP_CONTROL,
        }}
        height={400}
        width={'100%'}
        instanceRef={map}
      >
        <Placemark
          geometry={checkCoordinates ? coordinates : DEFAULT_COORDINATES}
          properties={{
            balloonContent: address ? address.name : PROJECT_NAME,
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

const MemoMapView = memo(MapView);
export default MemoMapView;
