import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from '../redux/features/usersSlice';
import { createOrder } from '../redux/features/salesSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ isOpen, onClose, cartItems }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchAllUsers());
            setSelectedProducts(cartItems); // Set selected products to cart items
        }
    }, [isOpen, dispatch, cartItems]);

    const handleIncrement = (productId) => {
        const updatedProducts = selectedProducts.map(product =>
            product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
        );
        setSelectedProducts(updatedProducts);
    };

    const handleDecrement = (productId) => {
        const updatedProducts = selectedProducts.map(product =>
            product._id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        );
        setSelectedProducts(updatedProducts);
    };

    const getTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + (product.quantity * product.sellingPrice), 0);
    };

    const handleSubmitOrder = () => {
        const order = {
            userId: selectedUser,
            products: selectedProducts
        };
        navigate('/receipt', { state: { order } }); // Navigate to receipt page with order data
        dispatch(createOrder(order));
        onClose();
    };

    if (!isOpen) return null;

    return (
        isOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                            <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900 focus:outline-none">
                                &times;
                            </button>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Checkout</h3>
                            <div className="mt-2">
                                <h2>Selected Products</h2>
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Product Image</th>
                                            <th className="px-4 py-2">Product Name</th>
                                            <th className="px-4 py-2">Quantity</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProducts.map(product => (
                                            <tr key={product._id}>
                                                <td className="border px-4 py-2"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover" /></td>
                                                <td className="border px-4 py-2">{product.name}</td>
                                                <td className="border px-4 py-2">{product.quantity}</td>
                                                <td className="border px-4 py-2">
                                                    <button onClick={() => handleDecrement(product._id)} className="bg-gray-200 px-3 py-1 rounded-full">-</button>
                                                    <button onClick={() => handleIncrement(product._id)} className="bg-gray-200 px-3 py-1 rounded-full ml-2">+</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h2>Total Amount</h2>
                                <p>${getTotalPrice()}</p>
                                <h2>Select User</h2>
                                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full py-2 px-4 border rounded-md">
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        <option key={user._id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                <button onClick={handleSubmitOrder} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Submit Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default CheckoutModal;
