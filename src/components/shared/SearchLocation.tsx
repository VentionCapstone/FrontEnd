import { Box, TextField, Typography, debounce } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import {
  FeatureMember,
  GeoObject,
  MapViewType,
  SuggestionsResponse,
} from '@src/types/yandex_map.types';
import { useMutation } from '@tanstack/react-query';
import SearchResults from './SearchResults';

const API_KEY = import.meta.env.VITE_YANDEX_API_KEY as string;

function SearchLocation({
  address,
  setAddress,
  handleCoordsChange,
  handleAddressChange,
  addressWatch,
}: MapViewType) {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<FeatureMember[]>([]);
  const [isSelecterOpen, setIsSelecterOpen] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleItemClick = (item: GeoObject) => {
    setKeyword('');
    setIsSelecterOpen(false);
    setAddress(item);
    handleCoordsChange(
      item.Point.pos
        .split(' ')
        .reverse()
        .map((item) => Number(item)) as [number, number]
    );
    const address = {
      country: item.metaDataProperty.GeocoderMetaData.Address.Components[0]?.name,
      city: item.metaDataProperty.GeocoderMetaData.Address.Components[1]?.name,
      street: item.metaDataProperty.GeocoderMetaData.Address.Components[2]?.name,
    };
    handleAddressChange(address);
  };

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (resultsRef.current !== null && !resultsRef.current.contains(e.target as Node)) {
        setIsSelecterOpen(!open);
      }
    };

    if (isSelecterOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isSelecterOpen, resultsRef]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: string) => {
      const { data } = await axios.get<SuggestionsResponse>(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value}`
      );
      const listOfSuggestions = data.response.GeoObjectCollection.featureMember;
      if (listOfSuggestions.length > 0) {
        const formattedData: FeatureMember[] = listOfSuggestions.reduce<FeatureMember[]>(
          (acc: FeatureMember[], curVal: FeatureMember) => {
            return acc.concat(curVal);
          },
          []
        );
        setResults(formattedData);
      } else {
        setResults([]);
      }
      setIsSelecterOpen(true);
    },
  });

  const debouncedSearchFunction = debounce(mutate, 500);

  const handler = useCallback(
    (value: string) => debouncedSearchFunction(value),
    [debouncedSearchFunction]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
    if (value.length === 0) {
      setIsSelecterOpen(false);
      return;
    } else {
      handler(value);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 8,
      }}
    >
      {addressWatch.country.length > 0 && (
        <Typography variant="body1" mb={2}>
          Location: {addressWatch.country}, {addressWatch.city}, {addressWatch?.street}
        </Typography>
      )}
      <TextField
        value={keyword}
        placeholder="Search location"
        onChange={handleChange}
        ref={resultsRef}
        sx={{
          width: '50%',
        }}
      />
      {address && (
        <Typography variant="body1" mt={2}>
          Selected location:{' '}
          {address?.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine}
        </Typography>
      )}

      {isSelecterOpen && (
        <SearchResults items={results} handleItemClick={handleItemClick} loading={isPending} />
      )}
    </Box>
  );
}

export default SearchLocation;
