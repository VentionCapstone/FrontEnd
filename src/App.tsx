import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query.config';
import { Toaster } from 'react-hot-toast';
import Routes from './routes/routes';
import ThemeWrapper from './theme';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>
        <Routes />
        <Toaster />
      </ThemeWrapper>
    </QueryClientProvider>
  );
}

export default App;
