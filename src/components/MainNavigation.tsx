import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { Button, Menu, MenuItem, Box, Container, ContainerProps, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpClient from '../api/httpClient';
import { UserResponse } from '../types/profile.types';
import { logout, setProfile } from '../stores/slices/authSlice';

function MainNavigation({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;
  const userId = localStorage.getItem('sub');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await httpClient.get<UserResponse>(`/users/${userId}`);
      dispatch(setProfile(data));
      return data;
    },
    enabled: isLoggedIn && userId !== null,
  });

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await httpClient.post('/auth/signout');
    },
    onSuccess: () => {
      dispatch(logout());
      queryClient.removeQueries();
      navigate('/');
    },
  });

  const handleClose = (action: string) => {
    switch (action) {
      case 'account':
        navigate('/account');
        break;
      case 'logout':
        mutate();
        break;
      case 'signIn':
        navigate('auth/signin');
        break;
      case 'signUp':
        navigate('auth/signup');
        break;
      default:
        break;
    }

    setAnchorEl(null);
  };

  return (
    <Container maxWidth={maxWidth} disableGutters sx={{ padding: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            '& img': {
              width: '2.5rem',
              height: '2.5rem',
            },
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="logo" />
              <Typography
                variant="h5"
                sx={{
                  marginLeft: '1rem',
                  color: 'secondary.main',
                  fontWeight: 'bold',
                  marginX: '0.5rem',
                }}
              >
                airbnb
              </Typography>
            </Box>
          </Link>
        </Box>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'space-between',
            'textTransform': 'none',
            'borderRadius': '2rem',
            'borderColor': 'secondary2.main',
            'color': 'secondary2.main',
            'borderWidth': '1px',
            'borderStyle': 'solid',
            '& svg': {
              marginLeft: '0.5rem',
            },
          }}
        >
          <MenuIcon />
          <AccountCircleIcon fontSize="large" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {isLoggedIn && !isError
            ? [
                <MenuItem key="account" onClick={() => handleClose('account')}>
                  Account
                </MenuItem>,
                <MenuItem key="logout" onClick={() => handleClose('logout')}>
                  Logout
                </MenuItem>,
              ]
            : [
                <MenuItem key="signIn" onClick={() => handleClose('signIn')}>
                  Sign In
                </MenuItem>,
                <MenuItem key="signUp" onClick={() => handleClose('signUp')}>
                  Sign Up
                </MenuItem>,
              ]}
        </Menu>
      </Box>
    </Container>
  );
}
export default MainNavigation;
