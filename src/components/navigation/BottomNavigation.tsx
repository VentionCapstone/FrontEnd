import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import SearchIcon from '@mui/icons-material/Search';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { hasToken } from '@src/stores/slices/authSlice';
import {
  BottomNavigation as BottomNavigationEnum,
  HomeUIInfo,
  Wishlist,
} from '@src/types/i18n.types';
import { mainNavigationStyles } from './mainNavigation.styles';

export const BottomNav = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector(hasToken);
  const [selectedRoute, setSelectedRoute] = useState<string>(route.pathname);

  const handleRouteChange = (_e: React.SyntheticEvent<Element, Event>, route: string) => {
    setSelectedRoute(route);
    navigate(route);
  };
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={selectedRoute}
        sx={mainNavigationStyles.bottomNav}
        onChange={handleRouteChange}
      >
        <BottomNavigationAction
          value={ROUTES.root}
          label={t(BottomNavigationEnum.explore)}
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          value={ROUTES.wishlist}
          key={ROUTES.wishlist}
          label={t(Wishlist.title)}
          icon={<FavoriteBorderRoundedIcon />}
        />

        {isLoggedIn && [
          <BottomNavigationAction
            value={ROUTES.bookings.root()}
            key={ROUTES.bookings.root()}
            label={t(BottomNavigationEnum.bookings)}
            icon={<ChatBubbleOutlineRoundedIcon />}
          />,
          <BottomNavigationAction
            value={ROUTES.account.edit}
            key={ROUTES.account.edit}
            label={t(HomeUIInfo.user_home_btn_account)}
            icon={<AccountCircleOutlinedIcon />}
          />,
        ]}

        {!isLoggedIn && (
          <BottomNavigationAction
            value={ROUTES.auth.signIn}
            label={t(HomeUIInfo.sign_in_sing_in_btn)}
            icon={<AccountCircleOutlinedIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
