// UserProfile.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchUserOrders } from "../redux/features/usersSlice";

export default function UserProfile() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const { users, loading, userOrders } = useSelector((state) => state.users);
    const user = users.find((user) => user._id === userId);

    useEffect(() => {
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        }
        // Fetch user orders
        dispatch(fetchUserOrders(userId));
    }, [dispatch, userId, user]);
    console.log(userOrders)

    let storedUser;
    try {
        storedUser = JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
        console.error("Error parsing stored user data:", error);
    }

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold my-8">User Profile</h1>
                    <p>Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!user && !storedUser) {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold my-8">User Profile</h1>
                    <p>User not found.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold my-8">User Profile</h1>
                {/* Display user information */}
                <div className="flex justify-between gap-2">
                    {/* User card 1 (left side) */}
                    <div className="w-1/4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">User Details 1</h2>
                            <p>Name: {user ? user.name : storedUser.name}</p>
                            <p>Email: {user ? user.email : storedUser.email}</p>
                            <p>Role: {user ? user.role : storedUser.role}</p>
                            {/* Add more user details if needed */}
                            <button className="bg-blue-500 block w-full text-white py-2 px-4 rounded mt-2">
                                Update
                            </button>
                        </div>
                    </div>
                    {/* Middle section for Transactions and Orders */}
                    <div className="w-1/2">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Transactions</h2>
                            {/* Add transaction information */}
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md mt-8">
                            <h2 className="text-xl font-bold mb-4">Orders</h2>
                            {userOrders && userOrders.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            {/* Add more table headers if needed */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                                                {/* Add more table cells for order details if needed */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                    {/* User card 2 (right side) */}
                    <div className="w-1/4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">CARD</h2>
                            <div className="container">
                                <h1>Blance: $120</h1>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
