import Typography from '@mui/material/Typography';
import EditablePanel from '../EditablePanel';
import { FullName } from './UserFullName';
import { Gender } from './UserGender';
import { Country } from './UserCountry';
import { Description } from './UserDescription';
import { PhoneNumber } from './UserPhoneNumber';
import Box from '@mui/material/Box';
import { UserImage } from './UserImage';

function PersonalInfo() {
  return (
    <>
      <Typography fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={600} component={'h1'}>
        Personal Info
      </Typography>

      <Box mt={10} mb={12}>
        <UserImage />
      </Box>

      <EditablePanel
        panelHeading={'Legal name'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            John Smith
          </Typography>
        }
        editable={(data) => <FullName collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Gender'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            Male
          </Typography>
        }
        editable={(data) => <Gender collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Where you live'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            Uzbeskistan
          </Typography>
        }
        editable={(data) => <Country collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Phone number'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            +998998021998
          </Typography>
        }
        editable={(data) => <PhoneNumber collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'About you'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            Write something fun and punchy.
          </Typography>
        }
        editable={(data) => <Description collapsePanel={data} />}
      />
    </>
  );
}

export default PersonalInfo;
