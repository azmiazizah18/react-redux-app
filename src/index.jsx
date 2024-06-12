import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './states';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages/routes';
import { Toast } from './components/design/toast';
import { Loading } from './components/design/loadingbar';

const App = () => (
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Loading />
      <RouterProvider router={router} />
      <Toast />
    </ReduxProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
