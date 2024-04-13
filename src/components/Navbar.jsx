import React from 'react';
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import logo from '../assets/1.png'


export default function Navbar() {
    const cartCount = 0
    return (
        <nav className='bg-gray-100 top-0 sticky z-50'>
            <div className="container pt-5">
                <div className="justify-between gap-2 items-center grid grid-cols-1 md w-full  md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <a href="/" className='font-bold text-2xl sm:text-3xl   flex gap-2'>
                            <img src={logo} alt="" srcSet="" className='w-10' />
                            Danjire <span className=' tracking-tighter text-2xl sm:text-3xl font-thin text-accent'>Grocery</span>
                        </a>
                    </div>
                    <div className="lg:flex  w-full max-w-full  rounded-md">
                        <input className='border-2 rounded-l-lg  border-accent px-6 py-2 w-full' type="text" placeholder='Baadh Alaabta' />
                        <div className="bg-accent rounded-r-lg   text-white text-[26px] grid place-items-center ">
                            <CiSearch />
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-8 items-center ">
                        <div className='md:flex gap-3 hidden'>
                            <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center">
                                <CiUser />

                            </div>
                            <div>
                                <p className='text-gray-500 '>Hello, User</p>
                                <p className='font-medium'>Your account</p>
                            </div>
                        </div>
                        <div className="text-gray-500 text-[32px] relative">
                            <IoCartOutline />
                            <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                                {
                                    cartCount
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-200 pt-4" />

                <div className="bg-accent flex overflow-x-auto md:overflow-x-hidden rounded-md">
                    <ul className="container flex gap-8 uppercase py-4 text-white">
                        <a href="">Home</a>
                        <a href="">Shop</a>
                        <a href="">Contact Us</a>
                        <a href="">About Us</a>
                    </ul>
                </div>
            </div>
        </nav>
    )
}