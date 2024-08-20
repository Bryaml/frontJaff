// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import AppRoutes from './Routes'; // Importa las rutas

import './output.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <AppRoutes /> {/* Usa el componente de rutas */}
      <Footer />
    </Router>
  </React.StrictMode>
);
