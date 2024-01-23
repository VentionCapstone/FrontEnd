import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import useUpdateAccountImageMutation from '@src/api/mutations/account/useUpdateAccountImageMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { QUERY_KEYS, queryClient } from '@src/config/react-query.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getProfile, getUser } from '@src/stores/slices/authSlice';
import { ProfileActions } from '@src/types/i18n.types';
import AddImage from '../../AddImage';
import EditablePanel from '../EditablePanel';
import Country from './EditCountry';
import Description from './EditDescription';
import FullName from './EditFullName';
import Gender from './EditGender';
import PhoneNumber from './EditPhoneNumber';

function PersonalInfo() {
  const user = useAppSelector(getUser);
  const profile = useAppSelector(getProfile);
  const imageUrl = profile?.imageUrl;
  const profileId = profile?.id;

  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const { t } = useTranslation();
  const { mutate } = useUpdateAccountImageMutation(newProfileImage);

  const updateUserImage = useCallback(() => {
    mutate(profileId, {
      onSuccess: () => {
        toast.success(t(ProfileActions.profile_image_change));
        queryClient
          .invalidateQueries({ queryKey: [QUERY_KEYS.query.user] })
          .catch((error) => console.error(error));
      },
    });
  }, [mutate, profileId, t]);

  const fullNameRenderProps = useCallback(
    (data: () => void) => (
      <FullName
        collapsePanel={data}
        initialFirstName={user?.firstName}
        initialLastName={user?.lastName}
      />
    ),
    [user?.firstName, user?.lastName]
  );

  const genderRenderProps = useCallback(
    (data: () => void) => <Gender collapsePanel={data} initialGender={profile?.gender} />,
    [profile?.gender]
  );

  const countryRenderProps = useCallback(
    (data: () => void) => <Country collapsePanel={data} initialCountry={profile?.country} />,
    [profile?.country]
  );

  const phoneNumberRenderProps = useCallback(
    (data: () => void) => <PhoneNumber collapsePanel={data} />,
    []
  );

  const descriptionRenderProps = useCallback(
    (data: () => void) => (
      <Description collapsePanel={data} initialDescription={profile?.description} />
    ),
    [profile?.description]
  );

  useEffect(() => {
    if (newProfileImage) {
      updateUserImage();
    }
  }, [newProfileImage, updateUserImage]);

  if (!user || !profile) return <LoadingPrimary />;

  return (
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
        <Box mr={{ md: 12, lg: 20 }} mb={{ xs: 12 }}>
          <AddImage imageUrl={imageUrl} setNewProfileImage={setNewProfileImage} />
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
                {user.firstName + ' ' + user.lastName}
              </Typography>
            }
            editable={fullNameRenderProps}
          />

          <EditablePanel
            panelHeading={'Your gender'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.gender}
              </Typography>
            }
            editable={genderRenderProps}
          />

          <EditablePanel
            panelHeading={'Where you live'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.country}
              </Typography>
            }
            editable={countryRenderProps}
          />

          <EditablePanel
            panelHeading={'Phone number'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.phoneNumber}
              </Typography>
            }
            editable={phoneNumberRenderProps}
          />

          <EditablePanel
            panelHeading={'About you'}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                Write something fun and punchy.
              </Typography>
            }
            editable={descriptionRenderProps}
          />
        </Box>
      </Stack>
    </>
  );
}

export default PersonalInfo;
