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
        <UserTable users={users} />
    );
};

export default UserList;
