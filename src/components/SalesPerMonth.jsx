import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSalesPerMonth } from '../redux/features/salesSlice';
import { GiProfit } from "react-icons/gi";
import DashboardCard from './DashboardCards';
import Loading from './Loading';

const SalesPerMonth = () => {
    const dispatch = useDispatch();
    const { salesPerMonth, loading, error } = useSelector(state => state.sales); // Access state.salesPerMonth directly
    useEffect(() => {
        dispatch(fetchSalesPerMonth());
    }, [dispatch]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DashboardCard
            title="Total Profit"
            value={salesPerMonth} // Pass the fetched data as value
            percentage="4.35"
            icon={<GiProfit className='text-3xl text-white' />} />);
};
export default SalesPerMonth;
