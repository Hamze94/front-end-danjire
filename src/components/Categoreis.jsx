import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../redux/features/categoriesSlice';
import { FaList, FaPlus } from 'react-icons/fa';
import Loading from './Loading';
import { MdDeleteOutline } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import AddCategoryModel from './AddCategoryModel';
export default function Categoreis() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { categories, loading, error } = useSelector(state => state.categoreis)
    useEffect(() => {
        dispatch(fetchCategories())
    }, []);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div>
            {/* Sidebar */}
            <div className="md:col-span-1 h-screen overflow-y-auto mb-6 md:mb-0">
                <button className="flex items-center bg-pink text-white px-4 py-2 rounded-md mb-4" onClick={handleToggleModal}>
                    <FaPlus className="mr-2" />
                    Add Category
                </button>
                <div className="bg-white rounded-md shadow-md">
                    <div className="p-4 border-b border-gray-300">
                        <h2 className="text-lg font-semibold mb-2">Categories</h2>
                    </div>
                    <ul>
                        {categories.map(category => (
                            <li key={category._id} className="border-b border-gray-300">
                                <div className="flex justify-between px-2 items-center">
                                    <MdDeleteOutline className="text-pink text-2xl hover:text-blue-600 cursor-pointer" />
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-200">{category.name}</a>
                                    <GrUpdate className="text-accent hover:text-blue-600 cursor-pointer" />
                                </div >
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showModal && (
                <AddCategoryModel onClose={handleToggleModal} />
            )}
        </div >
    )
}
