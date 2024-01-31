import { Box, TextField, Typography } from '@mui/material';
import {
  ChangeEvent,
  EventHandler,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import useGetLocationSuggestions from '@src/api/queries/accommodation/useGetLocationSuggestions';
import { CreateAccommodationRoute } from '@src/types/i18n.types';
import { FeatureMember, GeoObject, SerachLocationProps } from '@src/types/yandex_map.types';
import { selectGeoSearchFeaturedObjects, stringToNumberOfArray } from '@src/utils';
import { useTranslation } from 'react-i18next';
import DataFetchError from './DataFetchError';
import SearchResults from './SearchResults';

function SearchLocation({
  address,
  setAddress,
  onCoordsChange,
  onAddressChange,
  addressWatch,
}: SerachLocationProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [results, setResults] = useState<FeatureMember[]>([]);
  const [isSelecterOpen, setIsSelecterOpen] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const { data, isError } = useGetLocationSuggestions(searchInput);
  const { t } = useTranslation();

  useEffect(() => {
    if (data) {
      const formattedData = selectGeoSearchFeaturedObjects(data);

      setResults(formattedData);
      setIsSelecterOpen(true);
    } else {
      setResults([]);
    }
  }, [data]);

  useEffect(() => {
    const pageClickEvent: EventHandler<MouseEvent> = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setIsSelecterOpen(!isSelecterOpen);
      }
    };

    if (isSelecterOpen) {
      window.addEventListener('click', pageClickEvent as unknown as EventListener);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent as unknown as EventListener);
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

      onCoordsChange(stringToNumberOfArray(item.Point.pos));
      onAddressChange({ country, city, street });
    },
    [onAddressChange, onCoordsChange, setAddress]
  );

  if (isError) {
    return <DataFetchError />;
  }

  return (
    <Box sx={{ position: 'relative', mb: 8 }}>
      {!address && addressWatch.country.length > 0 && (
        <Typography variant="body1" mb={2}>
          {t(CreateAccommodationRoute.location)}: {addressWatch.country}, {addressWatch.city},{' '}
          {addressWatch?.street}
        </Typography>
      )}
      <TextField
        value={searchInput}
        placeholder={t(CreateAccommodationRoute.search_place)}
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
          {t(CreateAccommodationRoute.selected_place)}:{' '}
          {address.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country?.AddressLine}
        </Typography>
      )}
      {isSelecterOpen && <SearchResults items={results} onItemClick={handleItemClick} />}
    </Box>
  );
}

export default SearchLocation;
