import React, { useContext } from 'react';
import { DarkModeContext } from '../contex/DarkModeContex';

const DashboardCard = ({ title, value, percentage, icon }) => {
    const { darkMode } = useContext(DarkModeContext)
    return (
        <div className={`bg-white ${darkMode ? 'dark:bg-primary text-white' : ''} overflow-hidden shadow sm:rounded-lg`}>
            <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-semibold leading-6 ">{title}</h3>
                        <p className="mt-1 text-lg font-semibold  sm:mt-0 sm:col-span-2">{value}</p>
                        <p className="mt-1 text-sm ">({percentage})</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashboardCard;
