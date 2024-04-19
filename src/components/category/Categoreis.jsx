import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../redux/features/categoriesSlice";
import { FaPlus } from "react-icons/fa";
import Loading from "../Loading";
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import AddCategoryModel from "./AddCategoryModel";
import { useIsAdmin } from "../../auth";
export default function Categoreis() {
    const isAdmin = useIsAdmin();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null); // Stores selected Category for update
    const [showModal, setShowModal] = useState(false);
    const { categories, loading, error } = useSelector(
        (state) => state.categoreis
    );
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };
    const confirmDelete = (category) => {
        const result = window.confirm(
            "Are you sure you want to delete this category?"
        );
        console.log(result);
        if (result) {
            handleDeletecategory(category._id);
        }
    };
    const handleDeletecategory = (categoryId) => {
        if (isAdmin) {
            // Check for admin before deleting
            dispatch(deleteCategory(categoryId));
        } else {
            console.warn("You are not authorized to delete products");
        }
    };
    const handleUpdateClick = (category) => {
        if (isAdmin) {
            setSelectedCategory(category);
            setShowModal(true);
        } else {
            console.warn("You are not authorized to update categorys");
        }
    };
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            {/* Sidebar */}
            <div className="md:col-span-1 h-screen overflow-y-auto mb-6 md:mb-0">
                {isAdmin && (
                    <button
                        className="flex items-center bg-pink text-white px-4 py-2 rounded-md mb-4"
                        onClick={handleToggleModal}
                    >
                        <FaPlus className="mr-2" />
                        Add Category
                    </button>
                )}
                <div className="bg-white rounded-md shadow-md">
                    <div className="p-4 border-b border-gray-300">
                        <h2 className="text-lg font-semibold mb-2">Categories</h2>
                    </div>
                    <ul>
                        {categories.map((category) => (
                            <li key={category._id} className="border-b border-gray-300">
                                <div className="flex justify-between px-2 items-center">
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-200">
                                        {category.name}
                                    </a>
                                    {isAdmin && (
                                        <div className="flex space-x-2">
                                            <MdDeleteOutline
                                                className="text-pink text-2xl hover:text-blue-600 cursor-pointer"
                                                onClick={() => confirmDelete(category)}
                                            />
                                            <GrUpdate
                                                className="text-accent hover:text-blue-600 cursor-pointer"
                                                onClick={() => handleUpdateClick(category)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showModal && (
                <AddCategoryModel
                    onClose={handleToggleModal}
                    updateCategoryData={selectedCategory}
                />
            )}
        </div>
    );
}
