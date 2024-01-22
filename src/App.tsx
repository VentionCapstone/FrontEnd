import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './index.css';

import { queryClient } from './config/react-query.config';

import Routes from './routes/routes';
import ThemeWrapper from './theme';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeWrapper>
            <Routes />
            <Toaster />
          </ThemeWrapper>
        </LocalizationProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
