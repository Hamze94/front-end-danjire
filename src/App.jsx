import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
        <Route path='/shop' element={<Products />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  )
}

export default App
