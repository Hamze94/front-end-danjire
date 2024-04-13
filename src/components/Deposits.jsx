import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeposits } from '../redux/features/transactionsSlice';
import DashboardCard from './DashboardCards';
import { RiLuggageDepositFill } from "react-icons/ri";

export default function Deposits() {
    const dispatch = useDispatch();
    const { deposits, loading, error } = useSelector(state => state.transactions);
    console.log(deposits)
    useEffect(() => {
        dispatch(fetchDeposits())
    }, [dispatch]);
    if (loading) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Error:{error}</div>
    }
    return (
        <DashboardCard
            title="Deposits"
            value={deposits}
            icon={<RiLuggageDepositFill className='text-3xl text-white' />} />
    )
}
