import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Container, ContainerProps, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import useLogoutMutation from '@/api/mutations/account/useLogoutMutation';
import useGetUserQuery from '@/api/queries/account/useGetUserQuery';
import logo from '@/assets/logo.png';
import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';
import { mainNavigationStyles as styles } from './MainNavigation.styles';

function MainNavigation({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;
  const userId = localStorage.getItem('sub');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { isError } = useGetUserQuery(userId, isLoggedIn);
  const { mutate } = useLogoutMutation();

  const handleTouch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = () => mutate();

  return (
    <header style={{ borderBottom: '1px solid #707070' }}>
      <Container maxWidth={maxWidth} disableGutters sx={styles.container}>
        <Box sx={styles.headerBox}>
          <Box sx={styles.logoBox}>
            <Link to={ROUTES.root}>
              <Box sx={styles.logoBox}>
                <img src={logo} alt="logo" />
                <Typography variant="h5" sx={styles.logoText}>
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
            sx={styles.button}
          >
            <MenuIcon />
            <AccountCircleIcon fontSize="large" />
          </Button>
          <Menu
            open={open}
            id="basic-menu"
            sx={styles.menu}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {isLoggedIn && !isError
              ? [
                  <MenuItem key="account" onClick={handleClose}>
                    <Link style={{ width: '100%' }} to={ROUTES.account.root}>
                      Account
                    </Link>
                  </MenuItem>,
                  <MenuItem key="listings" onClick={handleClose}>
                    <Link style={{ width: '100%' }} to={ROUTES.accommodations.root}>
                      Manage Listings
                    </Link>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="signIn" onClick={handleClose}>
                    <Link style={{ width: '100%' }} to={ROUTES.auth.signIn}>
                      Sign In
                    </Link>
                  </MenuItem>,
                  <MenuItem key="sighUp" onClick={handleClose}>
                    <Link style={{ width: '100%' }} to={ROUTES.auth.signUp}>
                      Sign Up
                    </Link>
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Container>
    </header>
  );
}
export default MainNavigation;
