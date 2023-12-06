import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';
import { Suspense } from 'react';
import LoadingPrimary from './components/LoadingPrimary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPrimary />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
