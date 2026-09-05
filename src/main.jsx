import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css';
import Layout from './Layout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>,
);