import React, { useContext } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Importing icons from Font Awesome
import { DarkModeContext } from '../contex/DarkModeContex';

const FeatureProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Product 1',
            image: '/orange.png',
            price: '$10.99',
        },
        {
            id: 2,
            name: 'Product 2',
            image: '/carrot.png',
            price: '$12.99',
        },
        {
            id: 3,
            name: 'Product 3',
            image: '/banana.png',
            price: '$15.99',
        },
        {
            id: 4,
            name: 'Product 4',
            image: '/tomato.png',
            price: '$18.99',
        },
        {
            id: 5,
            name: 'Product 5',
            image: '/potato.png',
            price: '$20.99',
        },
        {
            id: 1,
            name: 'Product 1',
            image: '/orange.png',
            price: '$10.99',
        },
        {
            id: 2,
            name: 'Product 2',
            image: '/carrot.png',
            price: '$12.99',
        },
        {
            id: 3,
            name: 'Product 3',
            image: '/banana.png',
            price: '$15.99',
        },
        {
            id: 4,
            name: 'Product 4',
            image: '/tomato.png',
            price: '$18.99',
        },
        {
            id: 5,
            name: 'Product 5',
            image: '/potato.png',
            price: '$20.99',
        },
    ];
    const { darkMode } = useContext(DarkModeContext)

    return (
        <div className=" mt-0 pt-16">
            <div className='container mx-auto'>
                <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
                <div className="grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-5">
                    {products.map(product => (
                        <div key={product.id} className={`bg-white ${darkMode ? 'dark:bg-primary' : ''} rounded-md overflow-hidden shadow-md transform transition-transform hover:scale-105 relative z-10`}>
                            <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-700 mb-2">{product.price}</p>
                                <div className="flex justify-between items-center">
                                    <FaShoppingCart className="text-accent hover:text-blue-600 cursor-pointer" />
                                    <FaHeart className="text-gray-600 hover:text-red-600 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureProducts;
