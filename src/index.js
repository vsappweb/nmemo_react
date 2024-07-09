import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext"
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './i18n';
import { CircularProgress } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

disableReactDevTools();

root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <Suspense fallback={<div className="loading" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "30px" }}><CircularProgress color="inherit" />Loading...</div>}>
      <App />
    </Suspense>
    </AuthContextProvider>
  </React.StrictMode>
);
