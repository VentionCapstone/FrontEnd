import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import useLogoutMutation from '@src/api/mutations/account/useLogoutMutation';
import useGetUserQuery from '@src/api/queries/account/useGetUserQuery';
import { ROUTES } from '@src/config/routes.config';
import { HomeUIInfo, Wishlist } from '@src/types/i18n.types';
import { mainNavigationStyles as styles } from './mainNavigation.styles';

export const TopNavMenu = () => {
  const { data: user } = useGetUserQuery();
  const { mutate: logOut } = useLogoutMutation();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userImage = user?.profile?.imageUrl;

  const handleTouch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
        {user && <Box component={'img'} src={userImage} sx={styles.profileImage} />}
        <MenuRoundedIcon sx={{ mx: 2, fontSize: '1.25rem', color: 'secondary2.main' }} />
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
                <MenuItem sx={{ borderBottom: '1px solid', borderColor: 'secondary2.light' }}>
                  {t(HomeUIInfo.user_home_btn_account)}
                </MenuItem>
              </Link>,
              <Link
                key={ROUTES.wishlist}
                component={RouterLink}
                to={ROUTES.wishlist}
                onClick={handleClose}
              >
                <MenuItem>{t(Wishlist.title)}</MenuItem>
              </Link>,
              <Link
                key={ROUTES.accommodations.root}
                component={RouterLink}
                to={ROUTES.accommodations.root}
                onClick={handleClose}
              >
                <MenuItem>{t(HomeUIInfo.user_home_btn_mylistings)}</MenuItem>
              </Link>,
              <Link
                key={ROUTES.bookings.root}
                component={RouterLink}
                to={ROUTES.bookings.root}
                onClick={handleClose}
              >
                <MenuItem>My Bookings</MenuItem>
              </Link>,
              <MenuItem
                key="logout"
                onClick={handleLogout}
                sx={{ borderTop: '1px solid', borderColor: 'secondary2.light' }}
              >
                {t(HomeUIInfo.user_home_btn_logout)}
              </MenuItem>,
            ]
          : [
              <Link
                key={ROUTES.auth.signIn}
                component={RouterLink}
                to={ROUTES.auth.signIn}
                onClick={handleClose}
              >
                <MenuItem>{t(HomeUIInfo.sign_in_sing_in_btn)}</MenuItem>
              </Link>,
              <Link
                key={ROUTES.auth.signUp}
                component={RouterLink}
                to={ROUTES.auth.signUp}
                onClick={handleClose}
              >
                <MenuItem>{t(HomeUIInfo.sing_out_sing_up_btn)}</MenuItem>
              </Link>,
            ]}
      </Menu>
    </Box>
  );
};
