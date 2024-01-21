import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { getProfile, getUser } from '@src/stores/slices/authSlice';
import { AccountEditPageInfo, AccountEditPersonalInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import AddImage from '../../AddImage';
import EditablePanel from '../EditablePanel';
import Country from './EditCountry';
import Description from './EditDescription';
import FullName from './EditFullName';
import Gender from './EditGender';
import PhoneNumber from './EditPhoneNumber';

function PersonalInfo() {
  const { t } = useTranslation();
  const user = useAppSelector(getUser);
  const profile = useAppSelector(getProfile);
  const profileId = profile?.id ?? '';
  const imageUrl = profile?.imageUrl ?? '';

  const { mutate } = useEditAccountMutation(profileId);
  const [newProfileImage, setNewProfileImage] = useState('');

  useEffect(() => {
    if (newProfileImage) {
      mutate({ imageUrl: newProfileImage });
    }
  }, [newProfileImage, mutate]);

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

  if (!user || !profile) return <LoadingPrimary />;

  return (
    <>
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={600}
        component={'h1'}
      >
        {t(AccountEditPageInfo.personal_info)}
      </Typography>

      <Stack direction={{ md: 'row' }}>
        <Box mr={{ md: 12, lg: 20 }} mb={{ xs: 12 }}>
          <AddImage imageUrl={imageUrl} setImageUrl={setNewProfileImage} />
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
            panelHeading={t(AccountEditPersonalInfo.legal_name)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {user.firstName + ' ' + user.lastName}
              </Typography>
            }
            editable={fullNameRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.your_gender)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.gender}
                {/* {i18n.t(AccountEditPersonalInfo.male)} */}
              </Typography>
            }
            editable={genderRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.where_do_live)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.country}
              </Typography>
            }
            editable={countryRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.phone_number)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.phoneNumber}
              </Typography>
            }
            editable={phoneNumberRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.about_title)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {i18n.t(AccountEditPersonalInfo.about_desc)}
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
