import {
  ChevronRight,
  AccountCircleOutlined,
  SettingsOutlined,
  GppGoodOutlined,
} from '@mui/icons-material';
import { Box, Button, Link, Paper, Stack, Typography, StackProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../../hooks/redux-hooks';
import useLogoutMutation from '../../../api/mutations/account/useLogoutMutation';
import { MuiStylesObject } from '../../../types/utility.types';

const CustomStack = styled(Stack)<StackProps>(({ theme }) => ({
  height: '100%',
  gap: '1rem',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: '#EBEBEB',
    padding: '1rem 0',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    border: 'none',
    padding: '1rem',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
    borderRadius: '0.75rem',
  },
}));

const styles = {
  userImage: {
    width: {
      xs: '9rem',
      md: '12rem',
    },
    height: {
      xs: '9rem',
      md: '12rem',
    },
    bgcolor: 'primary.main',
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'cover',
  },
} satisfies MuiStylesObject;

function EditProfile() {
  const { mutate } = useLogoutMutation();
  const user = useAppSelector((state) => state.auth.user);
  const fullname = user && user.firstName + ' ' + user.lastName;
  const imageUrl = user?.Profile?.imageUrl ?? '';

  return (
    <>
      <Typography mb={'2rem'} fontSize={'2rem'} fontWeight={600} component={'h1'}>
        Profile
      </Typography>

      <Stack mt={'2rem'} mb={'3rem'} gap={'1.5rem'} justifyContent={'space-between'}>
        <Stack alignItems={'center'}>
          <Box component={'img'} src={imageUrl} sx={styles.userImage}></Box>

          <Typography
            variant={'xl'}
            sx={{
              display: '-webkit-box',
              mt: 4,
              mb: 1,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
            }}
          >
            {fullname}
          </Typography>

          <Typography variant={'sm'} noWrap sx={{ color: 'secondary2.main' }}>
            {user?.email}
          </Typography>
        </Stack>

        <Paper
          elevation={3}
          sx={{
            display: {
              md: 'none',
            },
            padding: 6,
            borderRadius: 3,
          }}
        >
          <Stack direction={'row'} gap={'1rem'} justifyContent={'space-between'}>
            <Stack gap={'0.25rem'}>
              <Typography fontSize={'1.125rem'} fontWeight={600}>
                Airbnb your place
              </Typography>
              <Typography variant={'sm'} color={'secondary2.main'}>
                It`s simple to get set up and start earning.
              </Typography>
            </Stack>

            <Box
              sx={{ width: '6rem', height: '5.5rem', bgcolor: 'secondary.main', flexShrink: 0 }}
            ></Box>
          </Stack>
        </Paper>
      </Stack>

      <Stack direction={{ md: 'row' }} gap={{ md: '1.5rem' }} color={'secondary.main'}>
        <Link
          component={RouterLink}
          to={'personal-info'}
          width={'100%'}
          sx={{ textDecoration: 'none' }}
        >
          <CustomStack borderTop={{ xs: '1px solid' }}>
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
                Personal Info
              </Typography>
              <Typography
                variant={'sm'}
                display={{ xs: 'none', md: 'block' }}
                color={'secondary2.main'}
              >
                Update your password and secure your account
              </Typography>
            </Box>
            <ChevronRight
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </CustomStack>
        </Link>

        <Link
          component={RouterLink}
          to={'login-and-security'}
          width={'100%'}
          sx={{ textDecoration: 'none' }}
        >
          <CustomStack>
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
                Login & Security
              </Typography>
              <Typography
                variant={'sm'}
                display={{ xs: 'none', md: 'block' }}
                color={'secondary2.main'}
              >
                Provide personal details and how we can reach you
              </Typography>
            </Box>
            <ChevronRight
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </CustomStack>
        </Link>

        <Link component={RouterLink} to={'settings'} width={'100%'} sx={{ textDecoration: 'none' }}>
          <CustomStack>
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
                Settings
              </Typography>
              <Typography display={{ xs: 'none', md: 'block' }} color={'secondary2.main'}>
                Set your default language, and currency
              </Typography>
            </Box>
            <ChevronRight
              sx={{
                display: {
                  md: 'none',
                },
              }}
            />
          </CustomStack>
        </Link>
      </Stack>

      <Button
        onClick={() => mutate()}
        fullWidth
        variant={'outlined'}
        sx={{
          display: {
            md: 'none',
          },
          mt: 12,
          padding: 3,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 3,
        }}
      >
        Log out
      </Button>
    </>
  );
}

export default EditProfile;
