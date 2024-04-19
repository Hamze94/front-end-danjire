import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../../redux/features/usersSlice'; // Import the addUser and updateUser actions
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddUserModel({ onClose, updateUserData }) {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const dispatch = useDispatch();
    const [error, setError] = useState(null); // State to manage error messages
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        try {
            if (updateUserData) {
                await dispatch(updateUser({ userId: updateUserData._id, updatedUser: data })).unwrap();
            } else {
                await dispatch(addUser(data)).unwrap();
            }
            onClose();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.data.message === 'User Exsit') {
                setError('User already exists.'); // Handle the specific error message
            } else {
                setError('An error occurred. Please try again.'); // Generic error message for other errors
            }
        }
    };



    useEffect(() => {
        if (updateUserData) {
            setValue('name', updateUserData.name);
            setValue('email', updateUserData.email);
            setValue('password', updateUserData.password);
            setValue('role', updateUserData.role);
            setValue('description', updateUserData.description);
            setValue('address', updateUserData.address);
            setValue('phoneNumber', updateUserData.phoneNumber);
        }
    }, [updateUserData, setValue]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-lg top-0 bottom-0 left-0 right-0 m-auto max-w-lg w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{updateUserData ? 'Update User' : 'Add User'}</h2>
                        <button className="text-gray-500" onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                    </div>
                    {error && <div className="mb-4 text-red-500">{error}</div>} {/* Display error message */}
                    <div className="max-h-96 overflow-y-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2">Name</label>
                                <input type="text" id="name" {...register("name", { required: "Name is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input type="email" id="email" {...register("email", { required: "Email is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2">Password</label>
                                <input type="password" id="password" {...register("password", { required: "Password is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="block mb-2">Role</label>
                                <select id="role" {...register("role", { required: "Role is required" })} className="border border-gray-300 px-4 py-2 w-full rounded">
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                {errors.role && <span className="text-red-500">{errors.role.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-2">Description</label>
                                <input type="text" id="description" {...register("description")} className="border border-gray-300 px-4 py-2 w-full rounded" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block mb-2">Address</label>
                                <input type="text" id="address" {...register("address")} className="border border-gray-300 px-4 py-2 w-full rounded" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                                <input type="text" id="phoneNumber" {...register("phoneNumber", { required: "Phone Number is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}
