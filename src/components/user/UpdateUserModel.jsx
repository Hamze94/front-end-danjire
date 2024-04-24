import React, { useState } from 'react';

const InputField = ({ label, value, onChange, type = 'text' }) => (
    <div className="mb-4">
        <label htmlFor={label.toLowerCase()} className="block mb-2">{label}</label>
        <input
            type={type}
            id={label.toLowerCase()}
            name={label.toLowerCase()} // Add name attribute
            value={value}
            onChange={onChange}
            className="border border-gray-300 px-4 py-2 w-full rounded"
        />
    </div>
);

const SelectField = ({ label, value, onChange, options }) => (
    <div className="mb-4">
        <label htmlFor={label.toLowerCase()} className="block mb-2">{label}</label>
        <select
            id={label.toLowerCase()}
            name={label.toLowerCase()} // Add name attribute
            value={value}
            onChange={onChange}
            className="border border-gray-300 px-4 py-2 w-full rounded"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);


const UpdateUserModal = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        description: user.description || '',
        address: user.address || '',
        phoneNumber: user.phoneNumber || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Implement logic to update user data
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-lg overflow-y-auto max-h-full"> {/* Adjusted width */}
                <h2 className="text-2xl font-bold mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <InputField label="Name" value={formData.name} onChange={handleChange} />
                    <InputField label="Email" value={formData.email} onChange={handleChange} type="email" />
                    <InputField label="Password" value={formData.password} onChange={handleChange} type="password" />
                    <SelectField
                        label="Role"
                        value={formData.role}
                        onChange={handleChange}
                        options={[
                            { value: 'USER', label: 'USER' },
                            { value: 'ADMIN', label: 'ADMIN' }
                        ]}
                    />
                    <InputField label="Description" value={formData.description} onChange={handleChange} />
                    <InputField label="Address" value={formData.address} onChange={handleChange} />
                    <InputField label="Phone Number" value={formData.phoneNumber} onChange={handleChange} type="number" />
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;
