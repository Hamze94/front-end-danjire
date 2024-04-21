import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, filterProductsByCategory } from "../redux/features/productsSlice"; // Import the filterProductsByCategory action
import Loading from "../components/Loading";
import { FaPlus, FaList } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddProductModel from "../components/product/AddProductModel";
import { MdDeleteOutline } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import Categoreis from "../components/category/Categoreis";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";
import { addItem } from "../redux/features/cartSlice"; // Import the addItem action
import { useIsAdmin } from "../auth";

const ProductsPage = () => {
    // Function to filter products by category
    const handleFilterByCategory = (categoryId) => {
        dispatch(filterProductsByCategory(categoryId));
    };

    const isAdmin = useIsAdmin(); // Call the custom hook
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null); // Stores selected product for update
    const { products, loading, error } = useSelector((state) => state.products);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (error && error.includes("Failed to update product")) {
        // Handle the error message for failed product update after refresh
        return <div>Error: Failed to update product. Please try again.</div>;
    } else if (error) {
        // Handle other errors
        return <div>Error: {error}</div>;
    }

    const handleToggleModal = () => {
        setShowModal(!showModal);
        setSelectedProduct(null); // Clear selected product when closing modal
    };
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };
    const handleDeleteProduct = (productId) => {
        if (isAdmin) {
            dispatch(deleteProduct(productId));
        } else {
            console.warn("You are not authorized to delete products");
        }
    };
    const confirmDelete = (product) => {
        const result = window.confirm(
            "Are you sure you want to delete this product?"
        );
        console.log(result);
        if (result) {
            handleDeleteProduct(product._id);
        }
    };
    const handleUpdateClick = (product) => {
        if (isAdmin) {
            // Check for admin before updating
            setSelectedProduct(product);
            console.log("edit" + showModal)
            setShowModal(!showModal);
        } else {
            console.warn("You are not authorized to update products");
        }
    };


    return (
        <>
            <Navbar />
            <div className="bg-gray-100 mt-0 pt-2">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
                    <Categoreis handleFilterByCategory={handleFilterByCategory} />
                    {/* Main Content */}
                    <div className="md:col-span-4 relative">
                        {/* Add Product Button */}
                        {isAdmin && (
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    className="flex items-center bg-pink text-white px-4 py-2 rounded-md "
                                    onClick={handleToggleModal}
                                >
                                    <FaPlus className="mr-2" />
                                    Add Product
                                </button>
                                <button className="flex items-center bg-pink text-white px-4 py-2 rounded-md">
                                    <FaList className="mr-2 " />
                                    {products.length}
                                    Products
                                </button>
                            </div>
                        )}
                        {/* Product Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
                            {products &&
                                products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-md overflow-hidden shadow-md transform transition-transform hover:scale-105 relative z-10"
                                    >
                                        <Link to={`/productdetails/${product._id}`}>
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-48 object-contain"
                                            />
                                        </Link>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-700 mb-2">
                                                ${product.sellingPrice}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <IoCartOutline
                                                    className="text-accent text-2xl hover:text-blue-600 cursor-pointer"
                                                    onClick={() => handleAddToCart(product)}
                                                />
                                                {isAdmin && (
                                                    <>
                                                        <MdDeleteOutline
                                                            className="text-pink text-2xl hover:text-blue-600 cursor-pointer"
                                                            onClick={() => confirmDelete(product)}
                                                        />
                                                        <GrUpdate
                                                            className="text-accent hover:text-blue-600 cursor-pointer"
                                                            onClick={() => handleUpdateClick(product)}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {showModal && (
                    <AddProductModel
                        onClose={handleToggleModal}
                        updateProductData={selectedProduct}
                    />
                )}
            </div>
            <Footer />
            {selectedProduct && <ProductDetails product={selectedProduct} />}
        </>
    );
};

export default ProductsPage;
