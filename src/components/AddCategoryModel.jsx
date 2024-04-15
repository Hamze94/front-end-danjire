import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../redux/features/categoriesSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddCategoryModel({ onClose, updateCategoryData }) {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = (data) => {
        if (updateCategoryData) {
            dispatch(updateCategory({ categoryId: updateCategoryData._id, updatedCategory: data }));
        } else {
            dispatch(addCategory(data));
        }
        onClose();
        navigate('/shop');
    };
    useEffect(() => {
        if (updateCategoryData) {
            setValue('name', updateCategoryData.name);
            setValue('description', updateCategoryData.description);
        }
    }, [updateCategoryData, setValue]);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-lg top-0 bottom-0 left-0 right-0 m-auto max-w-lg w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{updateCategoryData ? 'Update Category' : 'Add Category'}</h2>
                        <button className="text-gray-500" onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2">Category Name</label>
                                <input type="text" id="name" {...register("name", { required: "Category Name is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-2">Description</label>
                                <input type="text" id="description" {...register("description", { required: "Description is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}
