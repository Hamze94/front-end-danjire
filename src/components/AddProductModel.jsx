import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/features/productsSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function AddProductModel({ onClose, updateProductData }) {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

    const onSubmit = (data) => {
        if (updateProductData) {
            dispatch(updateProduct({ productId: updateProductData._id, updatedProduct: data }));
        } else {
            dispatch(addProduct({ productData: data }));
        }
        onClose();
        navigate('/shop');
    };

    useEffect(() => {
        if (updateProductData) {
            setValue('name', updateProductData.name);
            setValue('category', updateProductData.category);
            setValue('description', updateProductData.description);
            setValue('sellingPrice', updateProductData.sellingPrice);
            setValue('costPrice', updateProductData.costPrice);
            setValue('image', updateProductData.image); // Update image handling might be needed
            setValue('expireyDate', new Date(updateProductData.expireyDate)); // Convert expireyDate to a Date object
            // Check if an image is available
            if (updateProductData.image) {
                // Create a new File object with the image URL
                const imageFile = new File([null], updateProductData.image, { type: 'image/*' });
                setValue('image', imageFile);
            } else {
                // Handle case where image is null or undefined
                setValue('image', null); // Set image to null or some default value
            }
        }


    }, [updateProductData, setValue]);
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const expireyDate = watch("expireyDate");
    return (
        showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-lg top-0 bottom-0 left-0 right-0 m-auto max-w-lg w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Add Product</h2>
                        <button className="text-gray-500" onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2">Product Name</label>
                                <input type="text" id="name" {...register("name", { required: "Product Name is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block mb-2">Category</label>
                                <input type="text" id="category" {...register("category", { required: "Category is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-2">Description</label>
                                <input type="text" id="description" {...register("description", { required: "sellingPrice is required", min: { value: 0, message: "sellingPrice must be greater than or equal to 0" } })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="sellingPrice" className="block mb-2">Selling Price</label>
                                <input type="number" id="sellingPrice" {...register("sellingPrice", { required: "sellingPrice is required", min: { value: 0, message: "sellingPrice must be greater than or equal to 0" } })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.sellingPrice && <span className="text-red-500">{errors.sellingPrice.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="costPrice" className="block mb-2">Cost Price</label>
                                <input type="number" id="costPrice" {...register("costPrice", { required: "costPrice is required", min: { value: 0, message: "costPrice must be greater than or equal to 0" } })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.costPrice && <span className="text-red-500">{errors.costPrice.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block mb-2">Image Upload</label>
                                <input
                                    type="file"
                                    id="image"
                                    {...register("image", { required: "Image is required" })}
                                    className="border border-gray-300 px-4 py-2 w-full rounded"
                                />
                                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="expireyDate" className="block mb-2">Expiry Date</label>
                                <DatePicker
                                    id="expireyDate"
                                    selected={expireyDate}
                                    onChange={(date) => setValue("expireyDate", date)}
                                    dateFormat="MM/dd/yyyy"
                                    className="border border-gray-300 px-4 py-2 w-full rounded"
                                />
                                {errors.expireyDate && <span className="text-red-500">{errors.expireyDate.message}</span>}
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}
