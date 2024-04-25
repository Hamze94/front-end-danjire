import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardByUserId } from '../../redux/features/cardSlice';
import TransitionModelPopup from '../transtions/TransitionModelPopup';
import { DarkModeContext } from '../../contex/DarkModeContex';

export default function UserBalance({ userId, isAdmin, onUpdate }) {
    const { darkMode } = useContext(DarkModeContext)

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
        if (userId) {
            dispatch(fetchCardByUserId(userId, token));
        }
    }, [dispatch, token, userId]);

    const { userCard } = useSelector((state) => state.cards);

    useEffect(() => {
        if (userCard) {
            setBalance(userCard.balance);
        }
    }, [userCard]);

    if (!userId || (!isAdmin && userId !== userCard?.userId)) { // Check if user is not admin and userId does not match userCard userId
        return null;
    }

    return (
        <div className={`${darkMode ? ' bg-primary text-white ' : 'bg-white '}p-4 rounded-lg shadow-md`}>
            <div className="mb-4">
                <div className="container p-5">
                    <h1 className="text-3xl  text-center rounded-md p-10 bg-emerald-500  font-semibold">${balance}</h1>

                    {isAdmin && (
                        <button onClick={handleOpenTransactionModel} className="bg-pink w-full text-white py-2 px-4 rounded mt-2">
                            Add Transactions
                        </button>
                    )}
                </div>
            </div>
            {showTransactionModel && <TransitionModelPopup onClose={handleCloseTransactionModel} cardId={userCard?._id} onUpdate={onUpdate} />}
        </div>
    );
}
