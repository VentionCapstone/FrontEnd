import { Button, Menu, MenuItem, Box, Container, ContainerProps, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../hooks/redux-hooks';
import useLogoutMutation from '../api/mutations/account/useLogoutMutation';
import useGetUserQuery from '../api/queries/account/useGetUserQuery';
import logo from '../assets/logo.png';

function MainNavigation({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;
  const userId = localStorage.getItem('sub');
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleTouch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isError } = useGetUserQuery(userId, isLoggedIn);

  const { mutate } = useLogoutMutation();

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleGoToAccount = useCallback(() => navigate('/account'), [navigate]);
  const handleSignIn = useCallback(() => navigate('/auth/signin'), [navigate]);
  const handleSignUp = useCallback(() => navigate('/auth/signup'), [navigate]);
  const handleLogout = useCallback(() => mutate(), [mutate]);

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
          onClick={handleTouch}
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
                <MenuItem key="account" onClick={handleGoToAccount}>
                  Account
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  Logout
                </MenuItem>,
              ]
            : [
                <MenuItem key="signIn" onClick={handleSignIn}>
                  Sign In
                </MenuItem>,
                <MenuItem key="signUp" onClick={handleSignUp}>
                  Sign Up
                </MenuItem>,
              ]}
        </Menu>
      </Box>
    </Container>
  );
}
export default MainNavigation;
