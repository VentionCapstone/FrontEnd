import { Button, Menu, MenuItem, Box, Container, ContainerProps, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useLogoutMutation from '../api/mutations/account/useLogoutMutation';
import { mainNavigationStyles as styles } from './mainNavigationStyles';
import useGetUserQuery from '../api/queries/account/useGetUserQuery';
import { useAppSelector } from '../hooks/redux-hooks';
import logo from '../assets/logo.png';

function MainNavigation({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;
  const userId = localStorage.getItem('sub');

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

  const handleLogout = () => mutate();

  return (
    <Container maxWidth={maxWidth} disableGutters sx={styles.container}>
      <Box sx={styles.headerBox}>
        <Box sx={styles.logoBox}>
          <Link to="/">
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
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={styles.menu}
        >
          {isLoggedIn && !isError
            ? [
                <MenuItem key="account">
                  <Link to="/account">Account</Link>
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  Logout
                </MenuItem>,
              ]
            : [
                <MenuItem key="signIn">
                  <Link to="/auth/signin">Sign In</Link>
                </MenuItem>,
                <MenuItem key="sighUp">
                  <Link to="/auth/signup">Sign Up</Link>
                </MenuItem>,
              ]}
        </Menu>
      </Box>
    </Container>
  );
}
export default MainNavigation;
