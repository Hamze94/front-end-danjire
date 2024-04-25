import React, { useContext } from 'react';
import { AiOutlineClockCircle, AiOutlineCustomerService, AiOutlineDollarCircle } from 'react-icons/ai';
import { DarkModeContext } from '../contex/DarkModeContex';

const Banner = () => {
    const { darkMode } = useContext(DarkModeContext)
    return (
        <div className="container mx-auto py-4">
            <div className="grid grid-cols-1  sm:grid-cols-3 gap-2">
                <div className={`rounded-md overflow-hidden shadow-md p-6 text-center flex items-center ${darkMode ? 'bg-primary text-white' : 'bg-white text-black'}`}>
                    <AiOutlineClockCircle className="text-accent text-3xl lg:text-4xl mr-4" />
                    <div>
                        <p className="text-lg lg:text-xl font-semibold mb-2">Fast and Free Delivery</p>
                        <p className="text-gray-600">Free delivery for all orders over $20</p>
                    </div>
                </div>
                <div className={`rounded-md overflow-hidden shadow-md p-6 text-center flex items-center ${darkMode ? 'bg-primary text-white' : 'bg-white text-black'}`}>
                    <AiOutlineCustomerService className="text-accent text-3xl lg:text-4xl mr-4" />
                    <div>
                        <p className="text-lg lg:text-xl font-semibold mb-2">Friendly 24/7 Customer Service</p>
                        <p className="text-gray-600">Available whenever you need assistance</p>
                    </div>
                </div>
                <div className={`rounded-md overflow-hidden shadow-md p-6 text-center flex items-center ${darkMode ? 'bg-primary text-white' : 'bg-white text-black'}`}>
                    <AiOutlineDollarCircle className="text-accent text-3xl lg:text-4xl mr-4" />
                    <div>
                        <p className="text-lg lg:text-xl font-semibold mb-2">Moneyback Guarantee</p>
                        <p className="text-gray-600">We can give you your money back</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Banner;
