import React from 'react';
import ReactDOM from "react-dom/client"
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContexts';
import { TodoContextProvider } from './context/TodoContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
    <TodoContextProvider>
    <App />
    </TodoContextProvider>
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
