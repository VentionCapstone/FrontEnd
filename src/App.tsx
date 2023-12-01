import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/react-query';
import Routes from './routes/routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
