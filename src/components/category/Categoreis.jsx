import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../redux/features/categoriesSlice";
import { FaPlus } from "react-icons/fa";
import Loading from "../Loading";
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import AddCategoryModel from "./AddCategoryModel";
import { useIsAdmin } from "../../auth";
import ConfirmationModal from "../ConfirmationModal ConfirmationModal ";
import { DarkModeContext } from "../../contex/DarkModeContex";

export default function Categories({ handleFilterByCategory }) {
    const isAdmin = useIsAdmin();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null); // Stores selected Category for update
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation modal
    const [categoryToDelete, setCategoryToDelete] = useState(null); // State to store category to delete
    const token = useSelector(state => state.auth.token);

    const { categories, loading, error } = useSelector(
        (state) => state.categories
    );
    useEffect(() => {
        dispatch(fetchCategories(token));
    }, []);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDeleteCategory = () => {
        if (categoryToDelete && isAdmin) {
            console.log(categoryToDelete)
            // Check if categoryToDelete exists and user is admin
            dispatch(deleteCategory(categoryToDelete._id));
        } else {
            console.warn("You are not authorized to delete categories");
        }
        setCategoryToDelete(null); // Reset categoryToDelete state
        setShowConfirmationModal(false); // Close confirmation modal after deletion
        setShowModal(false)
    };

    const handleConfirmDelete = (category) => {
        console.log(category)
        setCategoryToDelete(category); // Set categoryToDelete state
        console.log(categoryToDelete)
        setShowConfirmationModal(true); // Open confirmation modal
    };

    const handleUpdateClick = (category) => {
        if (isAdmin) {
            setSelectedCategory(category);
            setShowModal(true);
        } else {
            console.warn("You are not authorized to update categories");
        }
    };

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    const { darkMode } = useContext(DarkModeContext)
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
                <div className={`${darkMode ? 'dark:bg-primary text-white rounded-md shadow-md' : 'rounded-md shadow-md bg-white'}rounded-md shadow-md`} >
                    <div className={` ${darkMode ? 'dark:bg-primary p-1 text-white' : ''} bg-white rounded-md shadow-md`}>
                        <h2 className="text-lg font-semibold mb-2 p-1">Categories</h2>
                    </div>
                    <ul>
                        {categories.map((category) => (
                            <li key={category._id} className="border-b border-gray-300">
                                <div className="flex justify-between px-2 items-center">
                                    {/* Call handleFilterByCategory when a category is clicked */}
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-200" onClick={() => handleFilterByCategory(category._id)}>
                                        {category.name}
                                    </a>
                                    {isAdmin && (
                                        <div className="flex space-x-2">
                                            <MdDeleteOutline
                                                className="text-pink text-2xl hover:text-blue-600 cursor-pointer"
                                                onClick={() => handleConfirmDelete(category)} // Use handleConfirmDelete instead of confirmDelete
                                            />
                                            <GrUpdate
                                                className="text-accent text-xl hover:text-blue-600 cursor-pointer"
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
            {
                showModal && (
                    <AddCategoryModel
                        onClose={handleToggleModal}
                        updateCategoryData={selectedCategory}
                    />
                )
            }
            {/* Render ConfirmationModal */}
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleDeleteCategory}
            />
        </div >
    );
}
