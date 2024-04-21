import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardByUserId } from '../../redux/features/cardSlice';
import TransitionModelPopup from '../transtions/TransitionModelPopup';

export default function UserBalance({ user, onUpdate }) { // Accept onUpdate callback function as prop
    const [storedUser, setStoredUser] = useState(null);
    const [balance, setBalance] = useState(null);
    const [showTransactionModel, setShowTransactionModel] = useState(false);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleOpenTransactionModel = () => {
        setShowTransactionModel(true);
    };

    const handleCloseTransactionModel = () => {
        setShowTransactionModel(false);
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            const parsedStoredUser = JSON.parse(storedUserData);
            setStoredUser(parsedStoredUser);
            dispatch(fetchCardByUserId(parsedStoredUser._id, token));
        }
    }, [dispatch, token]);

    const { userCard } = useSelector((state) => state.cards);

    useEffect(() => {
        if (userCard) {
            setBalance(userCard.balance);
        }
    }, [userCard]);

    if (!user && !storedUser) {
        return null;
    }

    const currentUser = user || storedUser;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <div className="container">
                    <h1 className="text-xl  text-center rounded-md p-2 bg-emerald-500  font-semibold">${balance}</h1>
                    <p className="mb-2 rounded-md uppercase  text-black p-2"> {currentUser.name}</p>
                    <p className="mb-2 rounded-md  p-2"> {currentUser.email}</p>
                    <p className="mb-2  p-2 rounded-md"> {currentUser.role}</p>
                    <button className="bg-blue-500 w-full text-white py-2 px-4 rounded mt-2">
                        Update Profile
                    </button>
                    <button onClick={handleOpenTransactionModel} className="bg-pink w-full text-white py-2 px-4 rounded mt-2">
                        Add Transactions
                    </button>
                </div>
            </div>
            {showTransactionModel && <TransitionModelPopup onClose={handleCloseTransactionModel} cardId={userCard._id} onUpdate={onUpdate} />}
        </div>
    );
}