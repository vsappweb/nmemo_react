import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext"
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

disableReactDevTools();

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
