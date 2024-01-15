import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';

import { queryClient } from './config/react-query.config';
import Routes from './routes/routes';
import ThemeWrapper from './theme';

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
