import logo from '../assets/1.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { addUser } from '../redux/features/usersSlice';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null); // State to manage error messages
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            dispatch(addUser(data))
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.data.message === 'User Exists') {
                setError('User already exists.'); // Handle the specific error message
            } else {
                setError('An error occurred. Please try again.'); // Generic error message for other errors
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
                    <img src={logo} alt="Logo" className="mx-auto mb-8 w-20" />
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="mb-4 text-red-500">{error}</div>}
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
                            <label htmlFor="description" className="block mb-2">Description</label>
                            <input type="text" id="description" {...register("description")} className="border border-gray-300 px-4 py-2 w-full rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block mb-2">Address</label>
                            <input type="text" id="address" {...register("address")} className="border border-gray-300 px-4 py-2 w-full rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                            <input type="number" id="phoneNumber" {...register("phoneNumber", { required: "Phone Number is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Signup;
