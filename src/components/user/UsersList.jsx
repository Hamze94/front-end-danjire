import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from '../../redux/features/usersSlice';
import UserTable from './UserTable';
import Loading from '../Loading';

const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.users);
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!Array.isArray(users) || users.length === 0) {
        return <div>No users available.</div>;
    }

    return (
        <div className="col-span-3 container bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Users</h2>

            <UserTable users={users} />
        </div>
    );
};

export default UserList;
