import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query';
import Routes from './routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
