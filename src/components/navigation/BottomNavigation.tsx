import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';

import { RoutesConfig } from '../../config/routes.config';
import { useAppSelector } from '../../hooks/redux-hooks';
import { mainNavigationStyles } from './mainNavigation.styles';
import { PRIMARY_LIGHT_THEME } from '../../theme/themeTokens';

export const BottomNav = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const mode = useTheme().palette.mode;
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;
  const [selectedRoute, setSelectedRoute] = useState<string>(route.pathname);

  const handleChange = (e: React.SyntheticEvent<Element, Event>, route: string) => {
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
        sx={{
          ...mainNavigationStyles.bottomNav,
          bgcolor: mode === 'light' ? 'background.default' : PRIMARY_LIGHT_THEME,
        }}
        onChange={handleChange}
      >
        <BottomNavigationAction value={RoutesConfig.Root} label="Explore" icon={<SearchIcon />} />
        <BottomNavigationAction label="Wishlist" icon={<FavoriteBorderRoundedIcon />} />
        {isLoggedIn ? (
          [
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
          ]
        ) : (
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
