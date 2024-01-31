import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@src/constants';
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
    <YMaps
      preload
      query={{
        lang: 'en_US',
        load: 'package.full',
      }}
    >
      <Map
        height={300}
        width={'100%'}
        state={{
          zoom: 15,
          center: coordinates,
        }}
      >
        <Placemark geometry={coordinates} />
      </Map>
    </YMaps>
  );
}
