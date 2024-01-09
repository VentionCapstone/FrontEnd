import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query.config';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Routes from './routes/routes';
import ThemeWrapper from './theme';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeWrapper>
          <Routes />
          <Toaster />
        </ThemeWrapper>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
