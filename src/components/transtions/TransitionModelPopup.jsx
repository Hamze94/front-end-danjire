import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addTransaction } from '../../redux/features/transactionsSlice';

export default function TransitionModelPopup({ onClose, cardData, orderData }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(true);

    const onSubmit = (data) => {
        dispatch(addTransaction(data));
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 transition-opacity ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Transaction Details</h2>
                    <button className="text-gray-500" onClick={handleCloseModal}>
                        <FaTimes />
                    </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="amount" className="block mb-2">Amount</label>
                            <input type="number" id="amount" {...register("amount", { required: "Amount is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                            {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block mb-2">Transaction Type</label>
                            <select id="type" {...register("type")} className="border border-gray-300 px-4 py-2 w-full rounded">
                                <option value="DEPOSIT">DEPOSIT</option>
                                <option value="CREDIT">CREDIT</option>
                            </select>
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
