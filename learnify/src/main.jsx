import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LearnifyApp from './Landing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearnifyApp />
  </StrictMode>,
)