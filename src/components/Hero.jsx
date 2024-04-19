import React from 'react';

export default function Hero() {
    return (
        <div className='container mx-auto mt-2'>
            <div className="flex rounded-md flex-col lg:flex-row items-center justify-between bg-white p-8 shadow-md">
                <div className="lg:w-1/2 lg:-mt-30 flex flex-col lg:pl-12 mb-8 lg:mb-0">
                    <div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">Welcome to Our Store</h1>
                        <p className="text-gray-700 text-lg mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget risus sed nisi dapibus porttitor.</p>
                        <div className="space-x-4">
                            <button className="bg-accent hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300">Shop Now</button>
                            <button className="bg-pink hover:bg-gray-800 text-white py-2 px-6 rounded-lg shadow-md transition duration-300">Learn More</button>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="bg-white overflow-hidden">
                        <img src="/card1.png" alt="Hero" className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
