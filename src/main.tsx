import React from 'react'
import { createRoot } from 'react-dom/client'
import './radiant/tokens/index.css'
import './app.css'
import App from './wizard/App'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
