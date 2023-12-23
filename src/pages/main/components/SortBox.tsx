import { Box, Typography } from '@mui/material';
import FilterChip from './FilterChip';
import { SortBoxProps } from '../../../types/accommodation.types';
import { MuiStylesObject } from '../../../types/utility.types';

const sortStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '1rem',
    rowGap: '1rem',
    marginY: '0.5rem',
    marginX: 'auto',
    width: {
      '2xl': '85%',
    },
  },
} satisfies MuiStylesObject;

const SortBox = ({ title, options, minItem, setValue, name }: SortBoxProps) => {
  const handleSelect = (id: number | string) => {
    setValue((prev) => ({ ...prev, [name]: id }));
  };

  return (
    <Box>
      <Typography>{title}</Typography>
      <Box sx={sortStyles.root}>
        {options.map((item) => (
          <FilterChip
            key={item.id}
            item={item}
            minItem={minItem}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SortBox;
