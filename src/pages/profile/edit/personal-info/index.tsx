import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EditablePanel from '../EditablePanel';
import FullName from './EditFullName';
import Gender from './EditGender';
import Country from './EditCountry';
import Description from './EditDescription';
import PhoneNumber from './EditPhoneNumber';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import AddImage from '../../AddImage';
import { useEffect, useState } from 'react';
import useEditAccountMutation from '../../../../api/mutations/account/useEditAccountMutation';
import LoadingPrimary from '../../../../components/LoadingPrimary';

function PersonalInfo() {
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.auth.user?.Profile);
  const profileId = profile?.id ?? '';

  const { mutate } = useEditAccountMutation(profileId);
  const [newProfileImage, setNewProfileImage] = useState('');

  const fullname = user && user.firstName + ' ' + user.lastName;

  useEffect(() => {
    if (newProfileImage) {
      mutate({ imageUrl: newProfileImage });
    }
  }, [newProfileImage, mutate]);

  return user && profile ? (
    <>
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={600}
        component={'h1'}
      >
        Personal Info
      </Typography>

      <Stack direction={{ md: 'row' }}>
        <Box mx={{ md: 12, lg: 20 }} mb={{ xs: 12 }}>
          <AddImage imageUrl={profile?.imageUrl} setImageUrl={setNewProfileImage} />
        </Box>

        <Box
          flexGrow={1}
          sx={{
            '& > *:first-of-type': {
              paddingTop: 0,
            },
          }}
        >
          <EditablePanel
            panelHeading={'Legal name'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {fullname}
              </Typography>
            }
            editable={(data) => (
              <FullName
                collapsePanel={data}
                initialFirstName={user.firstName}
                initialLastName={user.lastName}
              />
            )}
          />

          <EditablePanel
            panelHeading={'Your gender'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.gender}
              </Typography>
            }
            editable={(data) => <Gender collapsePanel={data} initialGender={profile.gender} />}
          />

          <EditablePanel
            panelHeading={'Where you live'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.country}
              </Typography>
            }
            editable={(data) => <Country collapsePanel={data} initialCountry={profile.country} />}
          />

          <EditablePanel
            panelHeading={'Phone number'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                +{profile.phoneNumber}
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
            editable={(data) => (
              <Description collapsePanel={data} initialDescription={profile.description} />
            )}
          />
        </Box>
      </Stack>
    </>
  ) : (
    <LoadingPrimary />
  );
}

export default PersonalInfo;
