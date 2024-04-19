import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useIsAdmin } from "../auth";
import { FaPlus } from "react-icons/fa";
import AddUserModel from "../components/user/AddUserModel";
import UserList from "../components/user/UsersList";
import Users from "../components/user/Users";

export default function User() {
    const [showModal, setShowModal] = useState(false);
    const handleToggleModal = () => {
        console.log(showModal)
        setShowModal(!showModal);
    };
    const isAdmin = useIsAdmin();
    if (!isAdmin) {
        return (
            <>
                <Navbar />{" "}
                <div className="container p-10 h-12">
                    <p>You are not authorized to access this page.</p>
                </div>{" "}
                <Footer />
            </>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mb-2  mt-2">
                <button className="flex items-center bg-pink text-white px-4 py-2 rounded-md mb-4" onClick={handleToggleModal}>
                    <FaPlus className="mr-2" />
                    Add Customer
                </button>
                {showModal && <AddUserModel onClose={handleToggleModal} />}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2 ">
                    <Users />
                </div>
                <h1 className="text-3xl font-semibold mb-4">USER MANGMENT</h1>
                <div className="grid grid-cols-1 ">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Users </h2>
                        <UserList />
                    </div>
                </div>
                <div className="grid grid-cols-1  mt-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">hh</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
