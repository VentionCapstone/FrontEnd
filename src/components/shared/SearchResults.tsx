import { Box } from '@mui/material';
import { FeatureMember, GeoObject } from '@src/types/yandex_map.types';
import LoadingPrimary from '../loader/LoadingPrimary';

interface SearchResultsProps {
  items: FeatureMember[];
  handleItemClick: (item: GeoObject) => void;
  loading: boolean;
}

const SearchResults = ({ items, handleItemClick, loading }: SearchResultsProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1,
        backgroundColor: 'white',
        maxHeight: '200px',
        width: '50%',
        overflow: 'auto',
        padding: '10px',
        mt: 2,
        borderRadius: '15px',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
      }}
    >
      {loading && <LoadingPrimary height="10vh" />}

      {items.length > 0 ? (
        <Box>
          {items.map((result, index) => (
            <Box
              component={'div'}
              key={index}
              onClick={() => handleItemClick(result.GeoObject)}
              sx={{
                'display': 'flex',
                'gap': '10px',
                'cursor': 'pointer',
                'padding': '10px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <p>{result?.GeoObject?.name}</p>
              <p>{result?.GeoObject?.description}</p>
            </Box>
          ))}
        </Box>
      ) : (
        <p>No results</p>
      )}
    </Box>
  );
};

export default SearchResults;
