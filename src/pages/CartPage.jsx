// CartPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeItem } from '../redux/features/cartSlice';
import { MdDeleteOutline } from 'react-icons/md';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.items.items);

    const handleIncrement = (productId) => {
        dispatch(incrementItem(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementItem(productId));
    };

    const handleRemove = (productId) => {
        dispatch(removeItem(productId)); // Dispatch removeItem action with product ID
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.quantity * item.sellingPrice), 0);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto mb-2  ">
                <div className='mx-10'>
                    <h1 className="text-3xl font-semibold mb-5">Cart</h1>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <>
                            {cartItems.map(item => (
                                <div key={item._id} className="flex items-center border-b border-gray-200 py-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-500">Price: ${item.sellingPrice}</p>
                                        <div className="flex items-center">
                                            <button className="bg-gray-200 px-3 py-1 rounded-full" onClick={() => handleDecrement(item._id)}>-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="bg-gray-200 px-3 py-1 rounded-full" onClick={() => handleIncrement(item._id)}>+</button>
                                            <button className="bg-gray-200 px-1 ml-2 py-1 rounded-full" ><MdDeleteOutline className="text-pink text-2xl hover:text-blue-600 cursor-pointer" onClick={() => handleRemove(item._id)} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-5">
                                <p className="font-semibold">Total: ${getTotalPrice()}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CartPage;
