import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../redux/features/usersSlice';
import DashboardCard from './DashboardCards';
import { GiTakeMyMoney } from "react-icons/gi";
import Loading from './Loading';

export default function Users() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.users);
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch]);
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div>Error:{error}</div>
    }
    return (
        <DashboardCard
            title="Users"
            value={users.length}
            percentage="All"
            icon={<GiTakeMyMoney className='text-3xl  text-white' />} />
    )
}
