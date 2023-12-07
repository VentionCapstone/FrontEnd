import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query';
import Routes from './routes/routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
