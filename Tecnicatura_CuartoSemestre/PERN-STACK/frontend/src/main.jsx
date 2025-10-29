import React from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from '../src/context/AuthContext.jsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
