import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/features/productsSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddProductModel({ onClose, updateProductData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        // If updating a product, pre-fill the form with product data
        if (updateProductData) {
            setValue('name', updateProductData.name);
            setValue('categoryId', updateProductData.categoryId); // Set the selected category value
            setValue('description', updateProductData.description);
            setValue('sellingPrice', updateProductData.sellingPrice);
            setValue('costPrice', updateProductData.costPrice);
            setValue('quantity', updateProductData.quantity);
            setValue('image', updateProductData.image);
            setValue('expireyDate', new Date(updateProductData.expireyDate));
        }
    }, [updateProductData, setValue]);

    const onSubmit = (data) => {
        if (updateProductData) {
            dispatch(updateProduct({ productId: updateProductData._id, updatedProduct: data }));
        } else {
            dispatch(addProduct({ productData: data }));
        }
        onClose();
        navigate('/shop');
    };

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
                            <div className="mb-4" >
                                <label className="block mb-2">Product Name</label>
                                <input type="text" {...register("name", { required: "Product Name is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Category</label>
                                <select {...register("categoryId", { required: "Category is required" })} className="border border-gray-300 px-4 py-2 w-full rounded">
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Description</label>
                                <input type="text" {...register("description", { required: "Description is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Selling Price</label>
                                <input type="number" {...register("sellingPrice", { required: "Selling Price is required", min: { value: 0, message: "Selling Price must be greater than or equal to 0" } })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.sellingPrice && <span className="text-red-500">{errors.sellingPrice.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Cost Price</label>
                                <input type="number" {...register("costPrice", { required: "Cost Price is required", min: { value: 0, message: "Cost Price must be greater than or equal to 0" } })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.costPrice && <span className="text-red-500">{errors.costPrice.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Quantiy</label>
                                <input type="number" {...register("quantity", { required: "quantity is required", min: { value: 0, message: "quantity no: must be greater than or equal to 0" } })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Image Upload</label>
                                <input type="file" {...register("image", { required: "Image is required" })} className="border border-gray-300 px-4 py-2 w-full rounded" />
                                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Expiry Date</label>
                                <DatePicker
                                    selected={expireyDate}
                                    onChange={(date) => setValue("expireyDate", date)}
                                    dateFormat="MM/dd/yyyy"
                                    className="border border-gray-300 px-4 py-2 w-full rounded"
                                />
                                {errors.expireyDate && <span className="text-red-500">{errors.expireyDate.message}</span>}
                            </div>
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}
