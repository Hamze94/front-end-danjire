import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import UpdateUserModal from "./UpdateUserModel";

const UserTable = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleUpdate = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

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
        <div>
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user._id} className="border-b  border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link
                                    to={`/users/${user._id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {user.name}
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                            <div className="truncate overflow-hidden">

                                <td className="px-6 py-4 whitespace-nowrap truncate">
                                    {user.description || "N/A"}
                                </td>
                            </div>
                            <td className="px-6 py-4 whitespace-nowrap truncate">
                                {user.address || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap truncate">
                                {user.phoneNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    <MdDeleteOutline className="text-pink text-2xl hover:text-blue-600 cursor-pointer" />
                                    <GrUpdate className="text-accent text-2xl hover:text-blue-600 cursor-pointer" onClick={() => handleUpdate(user)} />
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <span class=" bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                            key={i + 1}
                            className={`px-1 py-1 border border-gray-300 rounded-md focus:outline-none ${currentPage === i + 1
                                ? "bg-blue-500 text-white text-xs font-medium inline-flex items-center rounded-md px-2 py-1 ring-1 ring-inset ring-gray-500/10"
                                : "bg-white text-gray-700 text-xs hover:bg-gray-100 inline-flex items-center rounded-md px-2 py-1 ring-1 ring-inset ring-gray-500/10"
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
            )}
            {showModal && <UpdateUserModal user={selectedUser} onClose={() => setShowModal(false)} />}

        </div>

    );
};

export default UserTable;
