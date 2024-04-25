import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useIsAdmin } from "../auth";
import { FaPlus } from "react-icons/fa";
import AddUserModel from "../components/user/AddUserModel";
import UserList from "../components/user/UsersList";
import UsersCount from "../components/user/UsersCount";
import { DarkModeContext } from "../contex/DarkModeContex";

export default function UsersPage() {


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
    const { darkMode } = useContext(DarkModeContext)

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mb-2  mt-2">
                <button className={`flex items-center  bg-pink text-white px-4 py-2 rounded-md mb-4`} onClick={handleToggleModal}>
                    <FaPlus className="mr-2" />
                    Add Customer
                </button>
                {showModal && <AddUserModel onClose={handleToggleModal} />}
                <div className="grid grid-cols-1  gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2 ">
                    <UsersCount />
                </div>
                <div className="grid grid-cols-1 my-2 ">
                    <UserList />
                </div>

            </div>
            <Footer />
        </div>
    );
}
