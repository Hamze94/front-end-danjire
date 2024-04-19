import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCredits } from '../../redux/features/transactionsSlice';
import DashboardCard from '../DashboardCards';
import { GiTakeMyMoney } from "react-icons/gi";
import Loading from '../Loading';

export default function Credits() {
    const dispatch = useDispatch();
    const { credits, loading, error } = useSelector(state => state.transactions);
    console.log(credits)
    useEffect(() => {
        dispatch(fetchCredits())
    }, [dispatch]);
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>Error:{error}</div>
    }
    return (
        <DashboardCard
            title="Credits"
            value={"$ " + -credits}
            percentage="All"
            icon={<GiTakeMyMoney className='text-3xl  text-white' />} />
    )
}
