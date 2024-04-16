import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import CartPage from './pages/CartPage';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/shop' element={<Products />} />
          <Route path="/productdetails/:productId" element={<ProductDetails />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </Provider>

  )
}

export default App
