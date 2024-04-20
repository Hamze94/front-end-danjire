import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/features/usersSlice";
import UserOrderList from "../components/transtions/UserOrderList";
import Loading from "../components/Loading";
import TransactionList from "../components/transtions/TranstionList";
import UserBlance from "../components/user/UserBlance";

export default function UserProfile() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { users, loading, userOrders } = useSelector((state) => state.users);
    const user = users.find((user) => user._id === userId);

    useEffect(() => {
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        }
        dispatch(fetchUserOrders(userId));
    }, [dispatch, userId, user]);

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
                    <Loading />
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-2">
                    <UserBlance user={user} />
                    <div className="col-span-3 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Orders</h2>
                        <UserOrderList userId={userId} />
                    </div>
                </div>
                <div className="col-span-3 container bg-white p-4 rounded-lg shadow-md mb-2">
                    <TransactionList userId={userId} />
                </div>
            </div>
            <Footer />

        </div>
    );
}
