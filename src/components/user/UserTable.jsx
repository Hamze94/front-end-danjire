import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const UserTable = ({ users }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total number of pages
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Get users for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto text-center bg-white rounded-md shadow-md overflow-x-auto">
            <table className="min-w-max w-full table-auto">
                {/* Table headers */}
                <thead className="border-b border-neutral-200">
                    {/* Header row */}
                    <tr>
                        <th scope="col" className="px-1 py-1">
                            Name
                        </th>
                        <th scope="col" className="px-1 py-1">
                            Email
                        </th>
                        <th scope="col" className="px-1 py-1">
                            Role
                        </th>
                        <th scope="col" className="px-1 py-1">
                            Description
                        </th>
                        <th scope="col" className="px-1 py-1">
                            Address
                        </th>
                        <th scope="col" className="px-1 py-1">
                            Phone Number
                        </th>
                        <th scope="col" className="px-1 py-1">
                            Action
                        </th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr
                            key={user._id}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                            <Link
                                to={`/users/${user._id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {user.name}
                            </Link>{" "}
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {user.description || "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {user.address || "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {user.phoneNumber}
                            </td>
                            <td>
                                {" "}
                                <div className="flex space-x-2">
                                    <MdDeleteOutline className="text-pink text-2xl hover:text-blue-600 cursor-pointer" />
                                    <GrUpdate className="text-accent text-2xl hover:text-blue-600 cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <hr className="my-4 border-gray-300" />

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`px-1 py-1 border border-gray-300 rounded-md focus:outline-none ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
            <hr className="my-4 border-gray-300" />
        </div>
    );
};

export default UserTable;
