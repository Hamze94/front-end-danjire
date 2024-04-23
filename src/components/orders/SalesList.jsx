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

    return (
        <div className="col-span-3 bg-white p-4 rounded-lg shadow-md my-2">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {sale.user.map((user) => (
                                    <div key={user._id}>
                                        {user.name}
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center">
                                    {sale.products.map((product) => (
                                        <div key={product._id} className="flex flex-col items-center mr-4">
                                            <img src={product.imageUrl} alt={product.name} className="h-8 w-8 mb-2" />
                                            <div>{product.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
