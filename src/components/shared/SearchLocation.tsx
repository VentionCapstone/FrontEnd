import { Box, TextField, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import useGetLocationSuggestions from '@src/api/queries/accommodation/useGetLocationSuggestions';
import { FeatureMember, GeoObject, MapViewType } from '@src/types/yandex_map.types';
import { stringToNumberOfArray } from '@src/utils';
import DataFetchError from './DataFetchError';
import SearchResults from './SearchResults';

function SearchLocation({
  address,
  setAddress,
  handleCoordsChange,
  handleAddressChange,
  addressWatch,
}: MapViewType) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [results, setResults] = useState<FeatureMember[]>([]);
  const [isSelecterOpen, setIsSelecterOpen] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const { data, isError } = useGetLocationSuggestions(searchInput);

  useEffect(() => {
    if (data && data.response.GeoObjectCollection.featureMember.length > 0) {
      const formattedData = data.response.GeoObjectCollection.featureMember.flat();
      setResults(formattedData);
      setIsSelecterOpen(true);
    } else {
      setResults([]);
    }
  }, [data]);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setIsSelecterOpen(!isSelecterOpen);
      }
    };

    if (isSelecterOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isSelecterOpen]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }, []);

  const handleItemClick = useCallback(
    (item: GeoObject) => {
      setSearchInput('');
      setIsSelecterOpen(false);
      setAddress(item);

      const { Components } = item.metaDataProperty.GeocoderMetaData.Address;
      const [country, city, street] = Components.slice(0, 3).map((comp) => comp?.name || '');

      handleCoordsChange(stringToNumberOfArray(item.Point.pos) as [number, number]);
      handleAddressChange({ country, city, street });
    },
    [handleAddressChange, handleCoordsChange, setAddress]
  );

  if (isError) {
    return <DataFetchError />;
  }

  return (
    <Box sx={{ position: 'relative', mb: 8 }}>
      {!address && addressWatch.country.length > 0 && (
        <Typography variant="body1" mb={2}>
          Location: {addressWatch.country}, {addressWatch.city}, {addressWatch?.street}
        </Typography>
      )}
      <TextField
        value={searchInput}
        placeholder="Search location"
        onChange={handleChange}
        ref={resultsRef}
        sx={{
          width: {
            xs: '100%',
            md: '70%',
            lg: '50%',
          },
        }}
      />
      {address && (
        <Typography variant="body1" mt={2}>
          Selected location:{' '}
          {address.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine}
        </Typography>
      )}
      {isSelecterOpen && <SearchResults items={results} handleItemClick={handleItemClick} />}
    </Box>
  );
}

export default SearchLocation;
