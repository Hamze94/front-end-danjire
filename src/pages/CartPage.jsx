import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    incrementItem,
    decrementItem,
    removeItem,
} from "../redux/features/cartSlice";
import { fetchCardByUserId } from "../redux/features/cardSlice";
import { MdDeleteOutline } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchAllUsers } from "../redux/features/usersSlice";
import { createOrder } from "../redux/features/salesSlice";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../redux/features/transactionsSlice";

const CartPage = () => {
    const users = useSelector((state) => state.users.users);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.items.items);
    useEffect(() => {
        setSelectedProducts(cartItems); // Set selected products to cart items
        dispatch(fetchAllUsers());
        dispatch(fetchCardByUserId(selectedUser));

    }, [dispatch, cartItems, selectedUser]);
    const handleIncrement = (productId) => {
        dispatch(incrementItem(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementItem(productId));
    };

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity * item.sellingPrice,
            0
        );
    };
    const handleRemove = (productId) => {
        dispatch(removeItem(productId)); // Dispatch removeItem action with product ID
    };
    const { userCard } = useSelector((state) => state.cards);
    const handleCheckout = () => {
        const cardId = userCard._id
        console.log(cardId)
        const totalAmount = getTotalPrice();

        // Create transaction data
        const transactionData = {
            cardId,
            type: "ORDER",
            amount: totalAmount,
        };

        // Dispatch action to add transaction
        dispatch(addTransaction(transactionData));

        // Create order data
        const order = {
            userId: selectedUser,
            user: users.find((user) => user._id === selectedUser),
            products: selectedProducts,
        };
        dispatch(createOrder(order));
        navigate("/receipt", { state: { order } });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center">
                <div className="mx-10 bg-white rounded-md w-1/2 p-4 my-2 items-center">
                    <h2 className="text-xl font-bold mb-4">Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <>
                            <select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                className="w-full py-2 px-4 border rounded-md"
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {selectedUser && ( // Check if a user is selected
                                <p className="mt-3">
                                    Selected User:{" "}
                                    {users.find((user) => user._id === selectedUser)?.name}
                                </p>
                            )}
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center border-b border-gray-200 py-4"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover mr-4"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-500">Price: ${item.sellingPrice}</p>
                                        <div className="flex items-center">
                                            <button
                                                className="bg-gray-200 px-3 py-1 rounded-full"
                                                onClick={() => handleDecrement(item._id)}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="bg-gray-200 px-3 py-1 rounded-full"
                                                onClick={() => handleIncrement(item._id)}
                                            >
                                                +
                                            </button>
                                            <button className="bg-gray-200 px-1 ml-2 py-1 rounded-full">
                                                <MdDeleteOutline
                                                    className="text-pink text-2xl hover:text-blue-600 cursor-pointer"
                                                    onClick={() => handleRemove(item._id)}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-5">
                                <p className="font-semibold">Total: ${getTotalPrice()}</p>
                                <button
                                    className="w-full bg-accent p-4 rounded-md text-white"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
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
