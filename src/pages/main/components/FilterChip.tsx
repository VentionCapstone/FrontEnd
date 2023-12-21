import { Chip } from '@mui/material';
import { ObjType } from '../../../types/accommodation.types';

interface FilterChipProps {
  minItem: number | string;
  item: ObjType;
  handleSelect: () => void;
}

function FilterChip({ minItem, item, handleSelect }: FilterChipProps) {
  const { name, id } = item;

  const chipStyles = {
    'transition': 'all 0.2s ease-in-out',
    'fontWeight': 'bold',
    'border': '1px solid',
    'padding': '10px',
    'paddingY': '18px',
    'cursor': 'pointer',
    'backgroundColor': minItem === id ? 'primary.main' : 'transparent',
    'color': minItem === id ? 'secondary2.light' : 'primary.main',
    ':hover': {
      color: minItem === id ? 'secondary2.light' : 'primary.main',
      borderColor: 'primary.main',
      backgroundColor: minItem === id ? 'primary.main' : 'transparent',
    },
    'borderColor': 'secondary2.main',
  };

  return (
    <Chip sx={chipStyles} label={name} variant="filled" onClick={handleSelect} color="secondary" />
  );
}

export default FilterChip;
