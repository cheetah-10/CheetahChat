import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/Context.jsx'
import ModeContextProvider from './context/ModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ModeContextProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ModeContextProvider>,
)