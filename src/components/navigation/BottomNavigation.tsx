import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import SearchIcon from '@mui/icons-material/Search';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';
import { hasToken } from '@/stores/slices/authSlice';
import { mainNavigationStyles } from './mainNavigation.styles';

export const BottomNav = () => {
  const route = useLocation();
  const navigate = useNavigate();
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
        <BottomNavigationAction value={ROUTES.root} label="Explore" icon={<SearchIcon />} />
        <BottomNavigationAction label="Wishlist" icon={<FavoriteBorderRoundedIcon />} />

        {isLoggedIn && [
          <BottomNavigationAction
            key={'Trips'}
            label="Trips"
            icon={<ChatBubbleOutlineRoundedIcon />}
          />,
          <BottomNavigationAction
            value={ROUTES.account.edit}
            key={ROUTES.account.edit}
            label="Profile"
            icon={<AccountCircleOutlinedIcon />}
          />,
        ]}

        {!isLoggedIn && (
          <BottomNavigationAction
            value={ROUTES.auth.signIn}
            label="Login"
            icon={<AccountCircleOutlinedIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
