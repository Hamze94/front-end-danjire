import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import { fetchUserTransactions } from '../../redux/features/transactionsSlice';
import { DarkModeContext } from '../../contex/DarkModeContex';

const TransactionList = ({ userId, onUpdate }) => {
    const dispatch = useDispatch();
    const { userTransactions, error, loading } = useSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(fetchUserTransactions(userId))
            .then(() => {
                onUpdate();
            })
            .catch((error) => {
                console.error('Error adding transaction:', error);
            });
    }, [dispatch, userId]);

    if (loading) {
        return <Loading />;
    }
    const { darkMode } = useContext(DarkModeContext)

    return (
        <div className="container mx-auto my-2">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <table className="min-w-full ">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {userTransactions.map((transaction) => (
                        <tr key={transaction._id} className={`border-b border-gray-200 ${darkMode && transaction.type !== 'DEPOSIT' ? 'bg-[#400000] text-white' : (transaction.type !== 'DEPOSIT' ? 'bg-red-50' : '')}`}>
                            <td className="px-6 py-4 whitespace-nowrap">${transaction.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
