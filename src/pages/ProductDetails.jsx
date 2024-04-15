import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
const myProducts = [
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
const ProductDetails = () => {
    const { productId } = useParams();
    const { products } = useSelector(state => state.products);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Find the product with the matching productId
        const selectedProduct = products.find(product => product._id === (productId));
        setProduct(selectedProduct);
    }, [productId, products]);

    if (!product) {
        return <Loading />
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto my-6">
                <div className="bg-white p-6 shadow-md rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <img src={product.imageUrl} alt={product.name} className="w-full mb-6 rounded-md shadow-md" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <p className="text-gray-700 mb-4">Price: {product.price}</p>
                            <div className="flex items-center mb-4">
                                <span className="mr-2">Quantity:</span>
                                <input type="number" className="border border-gray-300 px-4 py-2 w-16 rounded" defaultValue="1" min="1" />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-4">Add to Cart</button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md">Add to Wishlist</button>
                        </div>
                    </div>
                    {/* Featured Products Section */}
                    <div className="flex flex-col p-6">
                        <h1 className="font-bold text-4xl text-gray-800 ml-5 mb-5">Featured Products</h1>
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                            <div className="flex flex-nowrap ml-5">
                                {myProducts.map(product => (
                                    <div key={product.id} className="inline-block px-3">
                                        <div className="w-64  max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                                <p className="text-gray-700 mb-2">{product.price}</p>
                                                <div className="flex justify-between items-center">
                                                    <FaShoppingCart className="text-accent hover:text-blue-600 cursor-pointer" />
                                                    <FaHeart className="text-gray-600 hover:text-red-600 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
