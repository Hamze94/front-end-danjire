import React from 'react';

const SalesTable = ({ sales }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Preprocess sales data to calculate product counts
    const processedSales = sales.map(sale => {
        const productCounts = sale.products.reduce((acc, product) => {
            acc[product] = (acc[product] || 0) + 1;
            return acc;
        }, {});
        return { ...sale, productCounts };
    });

    return (
        <div className="container mx-auto my-2">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {processedSales.map(sale => (
                        <tr key={sale._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{sale.user.length > 0 ? sale.user.join(', ') : 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {Object.entries(sale.productCounts).map(([productName, count]) => (
                                    <div key={productName}>
                                        {count > 1 ? `${count} ${productName} ` : productName}
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(sale.orderDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
