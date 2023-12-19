import { SxProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeTokens } from '../theme/themeTokens';

const theme = createTheme(themeTokens);
export type MuiStylesObject = Record<string, SxProps<typeof theme>>;
