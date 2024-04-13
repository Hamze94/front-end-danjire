import React from 'react';

const Footer = () => {
    return (
        <footer className=" text-white py-0">
            <div className="container mx-auto">
                <div className='" rounded-md bg-accent p-10'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold mb-4">About Us</h3>
                            <p className="text-white ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget risus sed nisi dapibus porttitor.</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold text-white  mb-4">Contact</h3>
                            <p className="">123 Street, City, Country</p>
                            <p className="">email@example.com</p>
                            <p className="">+123 456 789</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <ul className="text-white ">
                                <li>Category 1</li>
                                <li>Category 2</li>
                                <li>Category 3</li>
                                <li>Category 4</li>
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <div className="flex items-center justify-center md:justify-start">

                            </div>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-white ">
                        <p>&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;