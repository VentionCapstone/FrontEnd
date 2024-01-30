import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import axios from 'axios';
import { useEffect, useRef } from 'react';

import { MapMouseEvent, MapViewType, SuggestionsResponse } from '@src/types/yandex_map.types';
import { parseCoord } from '@src/utils';
import { useMutation } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_YANDEX_API_KEY as string;

const MapView = ({ address, setAddress, handleCoordsChange, addressWatch }: MapViewType) => {
  const map = useRef<ymaps.Map>();

  useEffect(() => {
    if (map.current && address) {
      void map.current.setCenter(parseCoord(address.Point.pos), 15, {});
    }
  }, [address]);

  const { mutate } = useMutation({
    mutationFn: async (value: [number, number]) => {
      const { data } = await axios.get<SuggestionsResponse>(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value[1]},${value[0]}`
      );
      const listOfSuggestions = data.response.GeoObjectCollection.featureMember[0].GeoObject;
      setAddress(listOfSuggestions);
    },
  });

  const handleDragEnd = (event: MapMouseEvent) => {
    const target = event.originalEvent.target;
    const coord = target.geometry.getCoordinates();

    handleCoordsChange(coord);

    mutate(coord);
  };

  const checkCoordinates = () => {
    return addressWatch.latitude > 0 && addressWatch.longitude > 0;
  };

  return (
    <>
      <YMaps
        query={{
          apikey: import.meta.env.VITE_YANDEX_API_KEY as string,
        }}
      >
        <Map
          state={{
            zoom: 15,
            center: checkCoordinates()
              ? [addressWatch.latitude, addressWatch.longitude]
              : [41.2971, 69.2815],
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
                : [41.2971, 69.2815]
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
