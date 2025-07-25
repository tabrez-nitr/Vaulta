import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VaultaContextProvider } from './context/VaultaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VaultaContextProvider>
    <App />
    </VaultaContextProvider>
  </StrictMode>,
)
