import { Chip } from '@mui/material';
import { ReactElement } from 'react';

type CustomChipProps = {
  icon: ReactElement;
  selected: boolean | undefined;
  label: string;
  onDelete?: () => void;
  handleSelect?: () => void;
};

export default function CustomChip({
  icon,
  selected,
  label,
  handleSelect,
  onDelete,
}: CustomChipProps) {
  return (
    <Chip
      sx={{
        'transition': 'all 0.2s ease-in-out',
        'fontWeight': 'bold',
        'border': '1px solid',
        'padding': '8px',
        'paddingY': '15px',
        'width': 'fit-content',
        'height': 'fit-content',
        'backgroundColor': selected ? 'secondary.main' : 'transparent',
        'color': selected ? '#fff' : 'primary.light',
        ':hover': {
          backgroundColor: selected ? 'secondary.light' : 'transparent',
          color: selected ? '#fff' : 'secondary.main',
        },
        'borderColor': 'secondary.main',
      }}
      label={label}
      icon={icon}
      variant="filled"
      color="secondary"
      onClick={handleSelect}
      onDelete={onDelete}
    />
  );
}
