import { Box, Typography } from '@mui/material';
import FilterChip from './FilterChip';
import { SortBoxProps } from '../../../types/accommodation.types';

const SortBox = ({ title, options, minItem, handleSelect }: SortBoxProps) => {
  const sortStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '1rem',
    rowGap: '1rem',
    marginY: '0.5rem',
    marginX: 'auto',
    width: {
      '2xl': '85%',
    },
  };
  return (
    <Box>
      <Typography>{title}</Typography>
      <Box sx={sortStyles}>
        {options.map((item) => (
          <FilterChip
            key={item.id}
            item={item}
            minItem={minItem}
            handleSelect={() => handleSelect(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SortBox;
