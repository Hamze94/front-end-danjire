import React, { useContext, useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { CiUser } from "react-icons/ci";
import { logoutUser } from "../redux/features/authSlice"
import logo from '../assets/1.png'
import { useDispatch, useSelector } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny, MdPerson } from 'react-icons/md';
import { DarkModeContext } from '../contex/DarkModeContex';
import { fetchProducts } from '../redux/features/productsSlice'; // Import the action to fetch products

export default function Navbar() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const { items } = useSelector((state) => state.items)
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let cartCount = items.length;
    const token = useSelector(state => state.auth.token);
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.user._doc.name);
            setUserId(decodedToken.user._doc._id)
        }
    }, [token]);

    const handleLogout = () => {
        dispatch(logoutUser())
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        // Filter products based on the search term
        const filtered = products.filter(product =>
            product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchProducts(searchTerm));
    };

    return (
        <>
            <nav className={darkMode ? 'bg-[#08172c] text-white' : ' bg-[#f3f4f6]  top-0 sticky z-50'} >
                <div className="container pt-5">
                    <div className="justify-between gap-10 items-center grid grid-cols-1 md w-full  md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <Link to="/" className='font-bold text-2xl sm:text-3xl   flex gap-2'>
                                <img src={logo} alt="" srcSet="" className='w-10' />
                                Danjire <span className=' tracking-tighter text-2xl sm:text-3xl font-thin text-accent'>Grocery</span>
                            </Link>
                        </div>
                        <div className="lg:flex  w-full max-w-full  rounded-md">
                            <form onSubmit={handleSearchSubmit} className="flex w-full relative">
                                <input
                                    className='border-2 rounded-l-md rounded-r-md  text-black border-accent px-6 py-2 w-full focus:outline-none focus:border-gray-500'
                                    type="text"
                                    placeholder='Search products...'
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onFocus={() => setFilteredProducts([])}
                                />
                                <button type="submit" className="bg-accent rounded-r-md text-white text-[26px] px-6 py-2 absolute top-0 right-0">
                                    <CiSearch />
                                </button>
                                {filteredProducts.length > 0 && (
                                    <div className="absolute top-full left-0 text-black bg-white border border-gray-300 rounded-md mt-1 py-1 w-full">
                                        {filteredProducts.map(product => (
                                            <div key={product.id} className="px-4 py-2 flex items-center hover:bg-gray-100">
                                                <img src={product.imageUrl} alt={product.name} className="w-8 h-8 mr-2 text-black" />
                                                <Link to={`/productdetails/${product._id}`} className="flex-1 text-black">{product.name}</Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="flex gap-4 md:gap-8 items-center ">
                            {userName ? (
                                <div className='md:flex gap-3 hidden'>
                                    <div className={darkMode ? 'text-white rounded-full border-2 text-[32px] w-[50px] h-[50px] grid place-items-center' : 'rounded-full border-2 text-[32px] w-[50px] h-[50px] grid place-items-center border-black  text-black'}>
                                        <Link to={`/users/${userId}`} className="text-blue-500 hover:underline">
                                            <CiUser />
                                        </Link>
                                    </div>
                                    <div>
                                        <p className={darkMode ? 'text-white' : 'text-black'}>Hello {userName}</p>
                                        <button className='  bg-accent w-full text-white   rounded-lg pb-1 px-3 cursor-pointer' onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            ) : null}

                            <div className="text-gray-500 text-[39px] relative">
                                <Link to="/cart" className={darkMode ? 'text-white text-[37px] relative' : 'text-black text-[37px] relative'}>
                                    <GiShoppingCart />
                                    <div className="absolute top-[-10px] right-[-10px] bg-accent  w-[20px] h-[20px] rounded-full text-white text-[12px]  grid place-items-center">
                                        {cartCount}
                                    </div>
                                </Link>
                            </div>
                            <div>
                                {darkMode ? <FaMoon className='text-2xl' onClick={toggleDarkMode} /> : <MdOutlineWbSunny className='text-2xl' onClick={toggleDarkMode} />}

                            </div>
                        </div>
                    </div>
                    <div className="bg-accent mt-1 flex overflow-x-auto md:overflow-x-hidden rounded-md">
                        <ul className="container flex gap-8 uppercase py-4 text-white">
                            <a href="/">Home</a>
                            <a href="/shop">Shop</a>
                            <a href="/users">users</a>
                            <a href="/admin">Admin</a>
                            <a href="/login" className='float-right'>Login</a>
                        </ul>
                    </div>
                </div>
            </nav >
        </ >
    );
}
