import React from 'react';
import Navbar from '../components/Navbar';
import SalesPerMonth from '../components/SalesPerMonth';
import SalesList from '../components/SalesList';
import Footer from '../components/Footer';



const AdminDashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mb-2 ">
                <SalesPerMonth />
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
