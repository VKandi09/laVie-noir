import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop";
import './index.css'
import App from './App.jsx'
import AdminAuthProvider from './admin/AdminAuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <ScrollToTop />
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
