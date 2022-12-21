import React from 'react';
import {createRoot} from "react-dom/client";
import './style/index.scss';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Employees from './pages/Employees/Employees';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);
