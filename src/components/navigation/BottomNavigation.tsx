import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RoutesConfig } from '../../config/routes.config';
import { useAppSelector } from '../../hooks/redux-hooks';
import { mainNavigationStyles } from './mainNavigation.styles';
import { hasToken } from '../../stores/slices/authSlice';

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
        <BottomNavigationAction value={RoutesConfig.Root} label="Explore" icon={<SearchIcon />} />
        <BottomNavigationAction label="Wishlist" icon={<FavoriteBorderRoundedIcon />} />

        {isLoggedIn && [
          <BottomNavigationAction
            key={'Trips'}
            label="Trips"
            icon={<ChatBubbleOutlineRoundedIcon />}
          />,
          <BottomNavigationAction
            value={RoutesConfig.Account.Edit}
            key={RoutesConfig.Account.Edit}
            label="Profile"
            icon={<AccountCircleOutlinedIcon />}
          />,
        ]}

        {!isLoggedIn && (
          <BottomNavigationAction
            value={RoutesConfig.Auth.SignIn}
            label="Login"
            icon={<AccountCircleOutlinedIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
