import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import LoadingPrimary from './components/loader/LoadingPrimary.tsx';
import './i18n/i18n';
import './index.css';
import { store } from './stores/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPrimary />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
