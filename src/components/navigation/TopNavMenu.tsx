import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Box from '@mui/material/Box';

import { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import useLogoutMutation from '../../api/mutations/account/useLogoutMutation';
import useGetUserQuery from '../../api/queries/account/useGetUserQuery';
import { mainNavigationStyles as styles } from './mainNavigation.styles';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RoutesConfig } from '../../config/routes.config';

export const TopNavMenu = () => {
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
    <Box>
      <Button
        id="basic-button"
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
        {isLoggedIn && !isError
          ? [
              <MenuItem key="account">
                <Link component={RouterLink} to={RoutesConfig.Account.Root}>
                  Account
                </Link>
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem key="signIn">
                <Link component={RouterLink} to={RoutesConfig.Auth.SignIn}>
                  Sign In
                </Link>
              </MenuItem>,
            ]}
      </Menu>
    </Box>
  );
};
