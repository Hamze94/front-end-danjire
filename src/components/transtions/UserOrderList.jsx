import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../Loading';

const UserOrderList = ({ userId }) => {
    const dispatch = useDispatch();
    const { userOrders, error, loading } = useSelector((state) => state.users);
    const [productsMap, setProductsMap] = useState({});

    useEffect(() => {
        // Fetch user orders
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/orders/${userId}`);
                const orderData = response.data;
                const productsMap = orderData.map(order => ({
                    orderId: order._id,
                    products: order.products.map(product => ({
                        productId: product._id,
                        name: product.name,
                        imageUrl: product.imageUrl,
                    })),
                    orderDate: new Date(order.orderDate).toLocaleDateString(),
                }));
                setProductsMap(productsMap);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);



    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            {userOrders && userOrders.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Products
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsMap.map((order, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center">
                                        {/* Display product images and names */}
                                        {order.products.map((product, i) => (
                                            <div key={i} className="flex-shrink-0 mr-2">
                                                <img src={product.imageUrl} alt={product.name} className="h-8 w-8" />
                                                <span className="ml-1">{product.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.orderDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default UserOrderList;
