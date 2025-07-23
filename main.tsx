import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/AuthContext';
import RootLayout from './app/layout.tsx';
import HomePage from './app/page.tsx';
import LoginPage from './app/auth/login/page.tsx';
import DashboardPage from './app/dashboard/page.tsx';
import InvoicesLayout from './app/invoices/layout.tsx';
import InvoicesPage from './app/invoices/page.tsx';
import NewInvoicePage from './app/invoices/new/page.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesLayout />}>
              <Route index element={<InvoicesPage />} />
              <Route path="new" element={<NewInvoicePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);