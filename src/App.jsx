import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

function App() {
  return (
    <div>

      <Routes>
        <Route path="/OnlineShop/"  element={<Login />} />
        <Route path="/OnlineShop/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
