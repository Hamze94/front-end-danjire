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
        <div className='container mx-auto text-center bg-white rounded-md shadow-md overflow-x-auto'>
            <table className="min-w-max w-full table-auto">

                <thead className='border-b border-neutral-200'>
                    <tr>
                        <th scope="col" className="px-1 py-1">User</th>
                        <th scope="col" className="px-1 py-1">Products</th>
                        <th scope="col" className="px-1 py-1">Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {processedSales.map(sale => (
                        <tr key={sale._id}>
                            <td className='whitespace-nowrap px-6 py-4'>{sale.user.length > 0 ? sale.user.join(', ') : 'N/A'}</td>
                            <td className='whitespace-nowrap px-6 py-4 '>
                                {Object.entries(sale.productCounts).map(([productName, count]) => (
                                    <div key={productName}>
                                        {count > 1 ? `${count} ${productName}` : productName}
                                    </div>
                                ))}
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>{formatDate(sale.orderDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
