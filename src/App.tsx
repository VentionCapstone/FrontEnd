import { QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { queryClient } from './config/react-query';
import { Toaster } from 'react-hot-toast';
import Routes from './routes/routes';
import { theme } from './theme';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
