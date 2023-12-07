import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditablePanel from '../EditablePanel';
import { ProfileLang } from './ProfileLang';
import { ProfileCurrency } from './ProfileCurrency';

function ProfileSettings() {
  return (
    <>
      <Typography mb={10} fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={800} component={'h1'}>
        Settings
      </Typography>

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
            size="small"
            value={'Light'}
            labelId="profile-theme-select-label"
            id="profile-theme-select-label"
          >
            <MenuItem value={'Light'}>Light</MenuItem>
            <MenuItem value={'Dark'}>Dark</MenuItem>
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
        editable={(data) => <ProfileLang collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Preferred currency'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            United States dollar
          </Typography>
        }
        editable={(data) => <ProfileCurrency collapsePanel={data} />}
      />
    </>
  );
}

export default ProfileSettings;
