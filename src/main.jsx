import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import ChatProvider from './context/Chatprovider.jsx'
createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <ChatProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ChatProvider>
  </BrowserRouter>
)
