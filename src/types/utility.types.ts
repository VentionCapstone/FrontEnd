import { SxProps } from '@mui/material';
import { theme } from '../theme';

export type MuiStylesObject = Record<string, SxProps<typeof theme>>;
