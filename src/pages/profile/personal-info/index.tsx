import { Typography } from '@mui/material';
import EditablePanel from '../EditablePanel';
import { FullName } from './UserFullName';
import { Gender } from './UserGender';
import { Country } from './UserCountry';
import { Description } from './UserDescription';
import { PhoneNumber } from './UserPhoneNumber';

function PersonalInfo() {
  return (
    <>
      <Typography mb={6} fontSize={{ xs: '1.25rem', md: '2rem' }} fontWeight={600} component={'h1'}>
        Personal Info
      </Typography>

      <EditablePanel
        panelHeading={'Legal name'}
        initial={
          <Typography variant={'sm'} color={'darkGrey.main'}>
            John Smith
          </Typography>
        }
        editable={(data) => <FullName collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Gender'}
        initial={
          <Typography variant={'sm'} color={'darkGrey.main'}>
            Male
          </Typography>
        }
        editable={(data) => <Gender collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Where you live'}
        initial={
          <Typography variant={'sm'} color={'darkGrey.main'}>
            Uzbeskistan
          </Typography>
        }
        editable={(data) => <Country collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'Phone number'}
        initial={
          <Typography variant={'sm'} color={'darkGrey.main'}>
            +998998021998
          </Typography>
        }
        editable={(data) => <PhoneNumber collapsePanel={data} />}
      />

      <EditablePanel
        panelHeading={'About you'}
        initial={
          <Typography variant={'sm'} color={'darkGrey.main'}>
            Write something fun and punchy.
          </Typography>
        }
        editable={(data) => <Description collapsePanel={data} />}
      />
    </>
  );
}

export default PersonalInfo;
