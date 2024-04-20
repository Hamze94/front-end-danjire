import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSales } from '../../redux/features/salesSlice';
import SalesTable from './SalesTable';
import Loading from '../Loading';

const SalesList = () => {
    const dispatch = useDispatch();
    const { sales, loading, error } = useSelector(state => state.sales);
    useEffect(() => {
        dispatch(fetchSales());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!Array.isArray(sales) || sales.length === 0) {
        return <div>No sales data available.</div>;
    }

    return (
        <div className="col-span-3 bg-white p-4 rounded-lg shadow-md my-2">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <SalesTable sales={sales} />
        </div>
    );
};

export default SalesList;
