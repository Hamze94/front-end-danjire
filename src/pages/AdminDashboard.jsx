import React from 'react';
import Navbar from '../components/Navbar';
import SalesPerMonth from '../components/orders/SalesPerMonth';
import SalesList from '../components/orders/SalesList';
import Footer from '../components/Footer';
import Deposits from '../components/transtions/Deposits';
import Credits from '../components/transtions/Credits';
import Sales from '../components/orders/Sales';
import { useIsAdmin } from '../auth';



const AdminDashboard = () => {
    const isAdmin = useIsAdmin();
    if (!isAdmin) {
        return <><Navbar /> <div className='container p-10 h-12'><p>You are not authorized to access this page.</p></div>  <Footer /></>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mb-2 ">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2 ">
                    <SalesPerMonth />
                    <Deposits />
                    <Credits />
                    <Sales />
                </div>
                <div className="grid grid-cols-1 ">
                    <SalesList />
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
