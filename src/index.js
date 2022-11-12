import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Employees from './pages/Employees/Employees';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

reportWebVitals();