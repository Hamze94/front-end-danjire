import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import logo from '../assets/1.png';
import Navbar from '../components/Navbar';
import { loginUser } from '../redux/features/authSlice';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = React.useState('');

    const onSubmit = async (data) => {
        try {
            const action = await dispatch(loginUser(data));
            const { payload } = action;
            if (payload && payload.access_token) {
                // Save access token to local storage
                localStorage.setItem('accessToken', payload.access_token);
                // Decode access token to get user information
                const decodedToken = jwtDecode(payload.access_token);
                console.log(decodedToken)
                // Redirect to dashboard or home page
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Failed to log in');
        }
    };

    useEffect(() => {
        // Check if user already logged in
        if (localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full flex flex-col items-center">
                    <div className='flex flex-col items-center mb-8'>
                        <img src={logo} alt="Logo" className="w-20" />
                        <h2 className="text-3xl font-bold mb-4">Login</h2>
                    </div>

                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input type="email" {...register("email", { required: true })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input type="password" {...register("password", { required: true })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                            {errors.password && <span className="text-red-500">Password is required</span>}
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <button type="submit" className="bg-accent text-white px-4 py-2 rounded w-full">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
