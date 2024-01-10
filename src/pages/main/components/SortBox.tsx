import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

import { FormValue, ObjType } from '@/types/accommodation.types';
import { MuiStylesObject } from '@/types/utility.types';
import FilterChip from './FilterChip';

type SortBoxProps = {
  title: string;
  options: ObjType[];
  minItem: string;
  setValue: React.Dispatch<React.SetStateAction<FormValue>>;
  name: string;
};

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
  const handleSelect = useCallback(
    (id: number | string) => {
      setValue((prev) => ({ ...prev, [name]: id }));
    },
    [setValue, name]
  );

  return (
    <Box>
      <Typography>{title}</Typography>
      <Box sx={sortStyles.root}>
        {options.map((item) => (
          <FilterChip key={item.id} item={item} minItem={minItem} onSelect={handleSelect} />
        ))}
      </Box>
    </Box>
  );
};

export default SortBox;
