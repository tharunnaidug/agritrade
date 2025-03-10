import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './componets/Navbar.jsx'
import AppState from './context/AppState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppState>
      <Navbar />
      <App />
    </AppState>
  </StrictMode>
)
