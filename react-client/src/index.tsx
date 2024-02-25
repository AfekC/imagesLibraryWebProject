import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./contexts/AuthContext";
import { MediaProvider } from "./contexts/MediaContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId="934329096868-9lsrep09fiqs5giqnf6hmc3rgtt7jhdb.apps.googleusercontent.com">
        <AuthProvider>
            <MediaProvider>
                <App />
            </MediaProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
