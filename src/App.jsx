import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';
import Reports from './pages/Reports'; 
import Invoices from './pages/Invoices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invoice-list" element={<InvoiceList />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/reports" element={<Reports />} /> 
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </Router>
  );
}

export default App;
