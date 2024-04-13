import React from 'react';
import Navbar from '../components/Navbar';
import SalesPerMonth from '../components/SalesPerMonth';
import SalesList from '../components/SalesList';
import Footer from '../components/Footer';
import Deposits from '../components/Deposits';
import Credits from '../components/Credits';



const AdminDashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mb-2 ">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2 ">

                    <SalesPerMonth />
                    <Deposits />
                    <Credits />
                </div>
                <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
                <div className="grid grid-cols-1 ">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Sales</h2>
                        <SalesList />
                    </div>
                </div>
                <div className="grid grid-cols-1  mt-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Sales Graph</h2>
                        <SalesList />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
