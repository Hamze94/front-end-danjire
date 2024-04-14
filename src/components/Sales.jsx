import React, { useEffect } from 'react'
import DashboardCard from './DashboardCards';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { fetchSales } from '../redux/features/salesSlice';
import { MdProductionQuantityLimits } from "react-icons/md";

export default function Sales() {
    const dispatch = useDispatch();
    const { sales, loading, error } = useSelector(state => state.sales);
    console.log(sales)
    useEffect(() => {
        dispatch(fetchSales())
    }, [dispatch]);
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>Error:{error}</div>
    }
    return (
        <DashboardCard
            title="Sales"
            value={sales.length}
            percentage="All"
            icon={<MdProductionQuantityLimits className='text-3xl  text-white' />} />
    )
}