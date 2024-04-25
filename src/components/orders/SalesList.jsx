import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSales } from '../../redux/features/salesSlice';
import SalesTable from './SalesTable';
import Loading from '../Loading';
import { DarkModeContext } from '../../contex/DarkModeContex';

const SalesList = () => {
    const dispatch = useDispatch();
    const { sales, loading, error } = useSelector(state => state.sales);
    useEffect(() => {
        dispatch(fetchSales());
    }, [dispatch]);
    console.log(sales)
    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!Array.isArray(sales) || sales.length === 0) {
        return <div>No sales data available.</div>;
    }

    const { darkMode } = useContext(DarkModeContext)
    return (
        <div className={`col-span-3 container mt-2 ${darkMode ? 'bg-primary text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-md`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-lg">
                                {sale.user.map((user) => (
                                    <div key={user._id}>
                                        {user.name}
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                <div className="flex items-center">
                                    {sale.products.map((product) => (
                                        <div key={product._id} className="flex flex-col items-center mr-4">
                                            <img src={product.imageUrl} alt={product.name} className="h-8 w-8 mb-2" />
                                            <div>{product.name}</div>
                                            <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{product.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                {new Date(sale.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;
