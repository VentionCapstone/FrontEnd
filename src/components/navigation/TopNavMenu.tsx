import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import useLogoutMutation from '@src/api/mutations/account/useLogoutMutation';
import useGetUserQuery from '@src/api/queries/account/useGetUserQuery';
import { ROUTES } from '@src/config/routes.config';
import { mainNavigationStyles as styles } from './mainNavigation.styles';

export const TopNavMenu = () => {
  const { data: user } = useGetUserQuery();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleTouch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { mutate: logOut } = useLogoutMutation();

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = () => {
    logOut();
    handleClose();
  };

  return (
    <Box>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleTouch}
        sx={styles.button}
      >
        <MenuRoundedIcon sx={{ mx: 2, fontSize: '1.25rem', color: 'secondary2.main' }} />
        <AccountCircleIcon fontSize="large" sx={{ color: 'secondary2.light' }} />
      </Button>

      <Menu
        disableScrollLock
        open={open}
        onClose={handleClose}
        sx={styles.menu}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        slotProps={{
          paper: {
            sx: {
              width: '15rem',
              borderRadius: '0.5rem',
            },
          },
        }}
      >
        {user?.id
          ? [
              <Link
                key={ROUTES.account.root}
                component={RouterLink}
                to={ROUTES.account.root}
                onClick={handleClose}
              >
                <MenuItem>Account</MenuItem>
              </Link>,
              <Link
                key={ROUTES.accommodations.root}
                component={RouterLink}
                to={ROUTES.accommodations.root}
                onClick={handleClose}
              >
                <MenuItem>My Listings</MenuItem>
              </Link>,
              <Link
                key={ROUTES.bookings.root}
                component={RouterLink}
                to={ROUTES.bookings.root}
                onClick={handleClose}
              >
                <MenuItem>My Bookings</MenuItem>
              </Link>,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <Link
                key={ROUTES.auth.signIn}
                component={RouterLink}
                to={ROUTES.auth.signIn}
                onClick={handleClose}
              >
                <MenuItem>Sign In</MenuItem>
              </Link>,
              <Link
                key={ROUTES.auth.signUp}
                component={RouterLink}
                to={ROUTES.auth.signUp}
                onClick={handleClose}
              >
                <MenuItem>Sign Up</MenuItem>
              </Link>,
            ]}
      </Menu>
    </Box>
  );
};
