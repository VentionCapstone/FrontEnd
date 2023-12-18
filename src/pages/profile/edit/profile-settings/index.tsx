import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditablePanel from '../EditablePanel';
import { ProfileLang } from './ProfileLang';
import { ProfileCurrency } from './ProfileCurrency';
import { useCallback, useState } from 'react';

function ProfileSettings() {
  const [theme, setTheme] = useState<'LIGHT' | 'DARK'>('LIGHT');

  const languageRenderProps = useCallback(
    (data: () => void) => <ProfileLang collapsePanel={data} userLang="English" />,
    []
  );

  const currencyRenderProps = useCallback(
    (data: () => void) => <ProfileCurrency collapsePanel={data} userCurrency="USD" />,
    []
  );

  return (
    <>
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={800}
        component={'h1'}
      >
        Settings
      </Typography>

      <Box maxWidth={'60rem'}>
        <Stack
          py={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottom={'1px solid'}
          borderTop={'1px solid'}
          borderColor={'secondary2.light'}
        >
          <Typography fontWeight={600}>Theme</Typography>
          <FormControl>
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value as typeof theme)}
              size="small"
              labelId="profile-theme-select-label"
              id="profile-theme-select-label"
            >
              <MenuItem value={'LIGHT'}>Light</MenuItem>
              <MenuItem value={'DARK'}>Dark</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <EditablePanel
          panelHeading={'Preferred language'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              English
            </Typography>
          }
          editable={languageRenderProps}
        />

        <EditablePanel
          panelHeading={'Preferred currency'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              US Dollars
            </Typography>
          }
          editable={currencyRenderProps}
        />
      </Box>
    </>
  );
}

export default ProfileSettings;
