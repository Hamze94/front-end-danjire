import React from 'react';

const DashboardCard = ({ title, value, percentage, icon }) => {
    return (
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
                        <p className="mt-1 text-lg font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{value}</p>
                        <p className="mt-1 text-sm text-gray-500">({percentage})</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
