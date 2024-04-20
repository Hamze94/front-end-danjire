import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCard } from '../../redux/features/usersSlice';

export default function UserBlance({ user }) {
    const [storedUser, setStoredUser] = useState(null);
    const dispatch = useDispatch();

    const { card, error, loading } = useSelector(state => state.users)
    useEffect(() => {
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            const parsedStoredUser = JSON.parse(storedUserData);
            setStoredUser(parsedStoredUser);
            dispatch(fetchUserCard(parsedStoredUser._id)); // Dispatch action with stored user's ID
        }
    }, [dispatch]);

    // If user data is not available, render null
    if (!user && !storedUser) {
        return null;
    }

    // Use stored user data if user prop is not available
    const currentUser = user || storedUser;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <div className="container">
                    <h1 className="text-xl font-semibold">Balance: $120</h1>
                    <p className="mb-2"><span className="font-semibold">Name:</span> {currentUser.name}</p>
                    <p className="mb-2"><span className="font-semibold">Email:</span> {currentUser.email}</p>
                    <p className="mb-2"><span className="font-semibold">Role:</span> {currentUser.role}</p>
                    <button className="bg-blue-500 w-full text-white py-2 px-4 rounded mt-2">
                        Update Profile
                    </button>
                    <button className="bg-pink w-full text-white py-2 px-4 rounded mt-2">
                        Add Transtions
                    </button>
                </div>
            </div>
        </div>
    );
}
