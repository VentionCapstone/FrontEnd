import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';

import { queryClient } from './config/react-query.config';
import Routes from './routes/routes';
import ThemeWrapper from './theme';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <Routes />
          <Toaster />
        </ThemeWrapper>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
