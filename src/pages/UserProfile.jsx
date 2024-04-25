import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { fetchUserOrders } from '../redux/features/usersSlice';
import Loading from '../components/Loading';
import TransactionList from '../components/transtions/TranstionList';
import UserOrderList from '../components/transtions/UserOrderList';
import { fetchCardByUserId } from '../redux/features/cardSlice';
import { fetchUserTransactions } from '../redux/features/transactionsSlice';
import { useIsAdmin } from '../auth'; // Import the useIsAdmin hook
import UserBalance from '../components/user/UserBlance';
import { DarkModeContext } from '../contex/DarkModeContex';

export default function UserProfile() {
    const { darkMode } = useContext(DarkModeContext)
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.users);
    const isAdmin = useIsAdmin(); // Use the useIsAdmin hook to determine admin status
    const currentUser = useSelector((state) => state.auth.user); // Get current logged-in user

    useEffect(() => {
        dispatch(fetchUserOrders(userId));
        dispatch(fetchCardByUserId(userId)); // Fetch user card data
    }, [dispatch, userId]);

    const handleUpdate = () => {
        dispatch(fetchUserOrders(userId));
        dispatch(fetchCardByUserId(userId));
        dispatch(fetchUserTransactions(userId));
    };

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

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-2">
                    <UserBalance userId={userId} isAdmin={isAdmin} onUpdate={handleUpdate} /> {/* Pass isAdmin as prop */}
                    <div className={`col-span-3 ${darkMode ? 'bg-primary text-white' : 'bg-white'} p-4 rounded-lg shadow-md`}>
                        <h2 className="text-xl font-bold mb-4">Orders</h2>
                        <UserOrderList userId={userId} />
                    </div>
                </div>
                <div className={`col-span-3 ${darkMode ? 'bg-primary text-white' : 'bg-white'} p-4 rounded-lg shadow-md`}>
                    <TransactionList userId={userId} onUpdate={handleUpdate} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
