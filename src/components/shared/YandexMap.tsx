import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@src/constants';

type YandexMapProps = {
  latitude: number;
  longitude: number;
};

export default function YandexMap({ latitude, longitude }: YandexMapProps) {
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
          center: [latitude || DEFAULT_LATITUDE, longitude || DEFAULT_LONGITUDE],
        }}
      >
        <Placemark geometry={[latitude || DEFAULT_LATITUDE, longitude || DEFAULT_LONGITUDE]} />
      </Map>
    </YMaps>
  );
}
