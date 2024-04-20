import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import User from './pages/UsersPage';
import UserProfile from './pages/UserProfile';
import ReceiptPage from './pages/ReceiptPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
        <Route path='/shop' element={<ProductsPage />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:userId' element={<UserProfile />} />
        <Route path='/receipt' element={<ReceiptPage />} />


      </Routes>
    </Router>
  )
}

export default App
