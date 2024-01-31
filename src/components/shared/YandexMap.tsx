import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ZOOM,
  YANDEX_MAP_CONTROL,
  YANDEX_MAP_QUERY,
} from '@src/constants';
import { useMemo } from 'react';

type YandexMapProps = {
  latitude: number;
  longitude: number;
};

export default function YandexMap({ latitude, longitude }: YandexMapProps) {
  const coordinates = useMemo(() => {
    return [latitude || DEFAULT_LATITUDE, longitude || DEFAULT_LONGITUDE];
  }, [latitude, longitude]);

  return (
    <YMaps preload query={YANDEX_MAP_QUERY}>
      <Map
        height={300}
        width={'100%'}
        state={{
          zoom: DEFAULT_ZOOM,
          center: coordinates,
          controls: YANDEX_MAP_CONTROL,
        }}
      >
        <Placemark geometry={coordinates} />
      </Map>
    </YMaps>
  );
}
