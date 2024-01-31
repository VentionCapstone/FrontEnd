import {
  AccountCircleOutlined,
  ChevronRight,
  GppGoodOutlined,
  HomeOutlined,
  Luggage,
  SettingsOutlined,
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import useLogoutMutation from '@src/api/mutations/account/useLogoutMutation';
import houseIcon from '@src/assets/house.png';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { ROUTES } from '@src/config/routes.config';
import { PROJECT_NAME } from '@src/constants';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getUser } from '@src/stores/slices/authSlice';
import { AccountEditPageInfo, HomeUIInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { editPageStyles } from './index.styles';

function EditProfile() {
  const { t } = useTranslation();
  const { mutate } = useLogoutMutation();
  const user = useAppSelector(getUser);

  const imageUrl = user?.profile?.imageUrl ?? '';

  return user ? (
    <>
      <Stack mt={'2rem'} mb={'3rem'} gap={'1.5rem'} justifyContent={'space-between'}>
        <Stack alignItems={'center'}>
          <Box component={'img'} src={imageUrl} sx={editPageStyles.userImage} />

          <Typography variant={'xl'} sx={editPageStyles.fullName}>
            {user.firstName + ' ' + user.lastName}
          </Typography>

          <Typography variant={'sm'} noWrap sx={{ color: 'secondary2.main' }}>
            {user.email}
          </Typography>
        </Stack>

        <Box sx={editPageStyles.card}>
          <Stack direction={'row'} gap={'1rem'} justifyContent={'space-between'}>
            <Stack gap={'0.25rem'}>
              <Typography fontSize={'1.125rem'} fontWeight={600}>
                {t(AccountEditPageInfo.airbnb_your_place, { name: PROJECT_NAME })}
              </Typography>
              <Typography variant={'sm'} color={'secondary2.main'}>
                {t(AccountEditPageInfo.airbnb_your_place_desc)}
              </Typography>
            </Stack>

            <Box
              component={'img'}
              src={houseIcon}
              sx={{
                width: '6rem',
                height: '5.5rem',
                flexShrink: 0,
                objectFit: 'contain',
              }}
            ></Box>
          </Stack>
        </Box>
      </Stack>

      <Stack direction={{ md: 'row' }} gap={{ md: '1.5rem' }} color={'secondary.main'}>
        <Link
          component={RouterLink}
          to={'personal-info'}
          width={'100%'}
          sx={{ textDecoration: 'none' }}
        >
          <Stack
            sx={editPageStyles.customCard}
            borderTop={{ xs: '1px solid #EBEBEB' }}
            bgcolor={{
              md: 'backgroundSecondary.main',
            }}
          >
            <AccountCircleOutlined
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
              }}
            />
            <Box mr={'auto'}>
              <Typography mb={{ md: '0.5rem' }} fontWeight={{ md: 600 }}>
                {t(AccountEditPageInfo.personal_info)}
              </Typography>
              <Typography
                variant={'sm'}
                display={{ xs: 'none', md: 'block' }}
                color={'secondary2.main'}
              >
                {t(AccountEditPageInfo.personal_desc)}
              </Typography>
            </Box>
            <ChevronRight
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </Stack>
        </Link>

        <Link
          component={RouterLink}
          to={'login-and-security'}
          width={'100%'}
          sx={{ textDecoration: 'none' }}
        >
          <Stack
            sx={editPageStyles.customCard}
            bgcolor={{
              md: 'backgroundSecondary.main',
            }}
          >
            <GppGoodOutlined
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
              }}
            />
            <Box mr={'auto'}>
              <Typography mb={{ md: '0.5rem' }} fontWeight={{ md: 600 }}>
                {t(AccountEditPageInfo.login_secure)}
              </Typography>
              <Typography
                variant={'sm'}
                display={{ xs: 'none', md: 'block' }}
                color={'secondary2.main'}
              >
                {t(AccountEditPageInfo.login_secure_desc)}
              </Typography>
            </Box>
            <ChevronRight
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </Stack>
        </Link>

        <Link component={RouterLink} to={'settings'} width={'100%'} sx={{ textDecoration: 'none' }}>
          <Stack
            sx={editPageStyles.customCard}
            bgcolor={{
              md: 'backgroundSecondary.main',
            }}
          >
            <SettingsOutlined
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
              }}
            />
            <Box mr={'auto'}>
              <Typography mb={{ md: '0.5rem' }} fontWeight={{ md: 600 }}>
                {t(AccountEditPageInfo.setting)}
              </Typography>
              <Typography
                variant={'sm'}
                display={{ xs: 'none', md: 'block' }}
                color={'secondary2.main'}
              >
                {t(AccountEditPageInfo.setting_desc)}
              </Typography>
            </Box>
            <ChevronRight
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </Stack>
        </Link>

        <Box display={{ xs: 'flex', md: 'none' }}>
          <Link
            component={RouterLink}
            to={ROUTES.accommodations.root}
            width={'100%'}
            sx={{ textDecoration: 'none' }}
          >
            <Stack
              sx={editPageStyles.extraCard}
              bgcolor={{
                md: 'backgroundSecondary.main',
              }}
            >
              <HomeOutlined
                sx={{
                  fontSize: {
                    xs: '1.5rem',
                    md: '2.5rem',
                  },
                }}
              />
              <Box mr={'auto'}>
                <Typography mb={{ md: '0.5rem' }} fontWeight={{ md: 600 }}>
                  {t(HomeUIInfo.user_home_btn_mylistings)}
                </Typography>
              </Box>
              <ChevronRight
                sx={{
                  display: {
                    md: 'none',
                  },
                }}
              />
            </Stack>
          </Link>
        </Box>
        <Box display={{ xs: 'flex', md: 'none' }}>
          <Link
            component={RouterLink}
            to={ROUTES.bookings.root}
            width={'100%'}
            sx={{ textDecoration: 'none' }}
          >
            <Stack
              sx={editPageStyles.extraCard}
              bgcolor={{
                md: 'backgroundSecondary.main',
              }}
            >
              <Luggage
                sx={{
                  fontSize: {
                    xs: '1.5rem',
                    md: '2.5rem',
                  },
                }}
              />
              <Box mr={'auto'}>
                <Typography mb={{ md: '0.5rem' }} fontWeight={{ md: 600 }}>
                  My Bookings
                </Typography>
              </Box>
              <ChevronRight
                sx={{
                  display: {
                    md: 'none',
                  },
                }}
              />
            </Stack>
          </Link>
        </Box>
      </Stack>

      <Button
        onClick={() => mutate()}
        fullWidth
        variant={'outlined'}
        sx={editPageStyles.logoutButton}
      >
        {t(HomeUIInfo.user_home_btn_logout)}
      </Button>
    </>
  ) : (
    <LoadingPrimary />
  );
}

export default EditProfile;
