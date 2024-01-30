import { Box } from '@mui/material';
import { FeatureMember, GeoObject } from '@src/types/yandex_map.types';

interface SearchResultsProps {
  items: FeatureMember[];
  handleItemClick: (item: GeoObject) => void;
}

const SearchResults = ({ items, handleItemClick }: SearchResultsProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1,
        backgroundColor: 'backgroundSecondary.main',
        maxHeight: '200px',
        width: {
          xs: '100%',
          md: '70%',
          lg: '50%',
        },
        overflow: 'auto',
        padding: '10px',
        mt: 2,
        borderRadius: '15px',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
      }}
    >
      {items.length > 0 ? (
        <Box>
          {items.map(({ GeoObject }) => (
            <Box
              component={'div'}
              key={GeoObject.uri}
              onClick={() => handleItemClick(GeoObject)}
              sx={{
                'display': 'flex',
                'gap': '10px',
                'cursor': 'pointer',
                'padding': '10px',
                '&:hover': {
                  backgroundColor: 'secondary2.light',
                },
              }}
            >
              <p>{GeoObject?.name}</p>
              <p>{GeoObject?.description}</p>
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
