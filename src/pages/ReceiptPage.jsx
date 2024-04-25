import React, { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/1.png'
const ReceiptPage = () => {
    const receiptRef = useRef(null);
    const location = useLocation();
    const orderData = location.state.order;
    const navigate = useNavigate();

    useEffect(() => {
        const generatePDF = async () => {
            try {
                const receipt = receiptRef.current;

                await html2pdf().from(receipt).set({ format: 'a3' }).save();
            } catch (error) {
                console.error("Error generating PDF:", error);
            }

            // Navigate back to home after 5 seconds

        };

        generatePDF();
    }, [navigate]);

    // Function to calculate the total
    const getTotal = () => {
        return orderData.products.reduce((total, item) => total + item.total, 0);
    };

    return (
        <div ref={receiptRef} className="pt-2 px-5">
            <img src={logo} alt="danjirelogo" class="mx-auto w-16 py-4" />
            <div class="flex flex-col justify-center items-center gap-2">
                <h4 class="font-semibold">Danjire Grocery</h4>
                <p class="text-xs">Burao , Hodan</p>
                <p class="text-xs">+252 63 43488 </p>
            </div>
            <div class="flex flex-col gap-3 border-b py-6 text-xs">
                <p class="flex justify-between">
                    <span class="text-gray-500">Receipt No.:</span>
                    <span>#5033</span>
                </p>
                <p class="flex justify-between">
                    <span class="text-gray-500">Order Type:</span>
                    <span>Dine-in</span>
                </p>
                <p class="flex justify-between">
                    <span class="text-gray-500">Host:</span>
                    <span>DANJIRE Grocery</span>
                </p>
                <p class="flex justify-between">
                    <span class="text-gray-400">Customer:</span>
                    <span>{orderData.user.name}</span>
                </p>
            </div>

            {orderData.products && orderData.products.length > 0 && (
                <table className="border-collapse w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left font-bold">SL.</th>
                            <th className="p-3 text-left font-bold">Name</th>
                            <th className="p-3 text-left font-bold">Price</th>
                            <th className="p-3 text-left font-bold">Qty</th>
                            <th className="p-3 text-left font-bold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.products.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">${item.sellingPrice}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">${item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Render total */}
            <p className="mt-4 font-semibold">Total: ${getTotal()}</p>
        </div>
    );
};

export default ReceiptPage;
