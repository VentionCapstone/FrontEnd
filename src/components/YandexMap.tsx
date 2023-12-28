import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

type Props = {
  latitude: number;
  longitude: number;
  setCoords?: (coords: [number, number]) => void;
};

export default function YandexMap({ latitude, longitude, setCoords }: Props) {
  const handleMapClick = (e: { get: (arg0: string) => never }) => {
    if (!setCoords) return;
    const coords = e.get('coords');
    setCoords(coords);
  };

  return (
    <YMaps
      preload
      query={{
        apikey: import.meta.env.YANDEX_API_KEY as string,
        lang: 'ru_RU',
        load: 'package.full',
      }}
    >
      <Map
        height={300}
        width={'100%'}
        onClick={handleMapClick}
        state={{
          zoom: 15,
          center: [latitude || 41.2971, longitude || 69.2815],
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
        }}
      >
        <Placemark
          geometry={[latitude || 41.2971, longitude || 69.2815]}
          options={{
            draggable: true,
            preset: 'islands#redDotIcon',
          }}
        />
      </Map>
    </YMaps>
  );
}
