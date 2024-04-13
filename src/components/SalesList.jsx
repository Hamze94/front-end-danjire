import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSales } from '../redux/features/salesSlice';
import SalesTable from './SalesTable';

const SalesList = () => {
    const dispatch = useDispatch();
    const { sales, loading, error } = useSelector(state => state.sales);
    console.log(sales)
    useEffect(() => {
        dispatch(fetchSales());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!Array.isArray(sales) || sales.length === 0) {
        return <div>No sales data available.</div>;
    }

    return (
        <div className='bg-gray-100' >
            <h2>Sales List</h2>
            <SalesTable sales={sales} />
        </div>
    );
};

export default SalesList;
