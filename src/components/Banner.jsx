import React from 'react';
import { AiOutlineClockCircle, AiOutlineCustomerService, AiOutlineDollarCircle } from 'react-icons/ai';

const Banner = () => {
    return (
        <div className="container mx-auto py-4">
            <div className="grid grid-cols-1  sm:grid-cols-3 gap-2">
                <div className="bg-white rounded-md overflow-hidden shadow-md p-6 text-center flex items-center">
                    <AiOutlineClockCircle className="text-accent text-3xl lg:text-4xl mr-4" />
                    <div>
                        <p className="text-lg lg:text-xl font-semibold mb-2">Fast and Free Delivery</p>
                        <p className="text-gray-600">Free delivery for all orders over $20</p>
                    </div>
                </div>
                <div className="bg-white rounded-md  overflow-hidden shadow-md p-6 text-center flex items-center">
                    <AiOutlineCustomerService className="text-accent text-3xl lg:text-4xl mr-4" />
                    <div>
                        <p className="text-lg lg:text-xl font-semibold mb-2">Friendly 24/7 Customer Service</p>
                        <p className="text-gray-600">Available whenever you need assistance</p>
                    </div>
                </div>
                <div className="bg-white rounded-md  overflow-hidden shadow-md p-6 text-center flex items-center">
                    <AiOutlineDollarCircle className="text-accent text-3xl lg:text-4xl mr-4" />
                    <div>
                        <p className="text-lg lg:text-xl font-semibold mb-2">Moneyback Guarantee</p>
                        <p className="text-gray-600">We can give you your money back</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
