import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { SearchByCityInputProps } from '@src/types/accommodation.types';
import { SearchTexts } from '@src/types/i18n.types';
import parse from 'autosuggest-highlight/parse';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mainStyles } from '../index.styles';

const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null as google.maps.places.AutocompleteService | null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

export default function SearchByCityInput({ location, setLocation }: SearchByCityInputProps) {
  const { t } = useTranslation();

  const [value, setValue] = useState<google.maps.places.AutocompletePrediction | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<
    readonly google.maps.places.AutocompletePrediction[]
  >([]);
  const loaded = React.useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !loaded.current) {
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector('head'),
          'google-maps'
        );
      }

      loaded.current = true;
    }
  }, []);

  const handleValueChange = useCallback(
    (_event: unknown, newValue: google.maps.places.AutocompletePrediction | null | string) => {
      if (typeof newValue === 'string') return;
      setOptions(newValue ? [newValue, ...options] : options);
      setValue(newValue);
      const newLocation = formatLocationString(newValue?.description);
      setLocation(newLocation ? newLocation : '');
    },
    [options, setLocation]
  );

  const formatLocationString = (locationString: string | undefined) => {
    if (!locationString) return;
    const parts: Array<string> = locationString.split(',').map((part) => part.trim());
    const city = parts[0];
    const country = parts[parts.length - 1];

    const formattedLocationString = `${city}, ${country}`;
    return formattedLocationString;
  };

  const handleInputValueChange = useCallback(
    (_event: React.SyntheticEvent<Element, Event>, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    []
  );

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: {
            input: string;
            types: Array<string>;
          },
          callback: (results?: readonly google.maps.places.AutocompletePrediction[] | null) => void
        ) => {
          void autocompleteService.current?.getPlacePredictions(request, callback);
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      { input: inputValue, types: ['(cities)'] },
      (results?: readonly google.maps.places.AutocompletePrediction[] | null) => {
        if (active) {
          let newOptions: readonly google.maps.places.AutocompletePrediction[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [inputValue, fetch, value]);

  return (
    <Autocomplete
      id="google-map-search"
      sx={mainStyles.searchInput}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      filterSelectedOptions
      value={location ? location : options.find((place) => place === value)}
      noOptionsText={t(SearchTexts.input_location_no_options)}
      onChange={handleValueChange}
      onInputChange={handleInputValueChange}
      renderInput={(params) => {
        return (
          <>
            <TextField
              {...params}
              label={
                location
                  ? t(SearchTexts.input_location_label_default)
                  : t(SearchTexts.input_location_label_anywhere)
              }
              fullWidth
            />
          </>
        );
      }}
      renderOption={(props, option) => {
        if (typeof option === 'string') return;
        const matches = option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: MainTextMatchedSubstrings) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
