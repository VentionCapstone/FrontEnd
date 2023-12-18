import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import LoadingPrimary from './components/loader/LoadingPrimary.tsx';
import { store } from './stores/store.ts';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPrimary />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
