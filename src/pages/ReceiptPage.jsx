import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReceiptPage = (props) => {
    console.log(props)
    const receiptRef = useRef(null);

    useEffect(() => {
        const generatePDF = async () => {
            const receipt = receiptRef.current;
            const canvas = await html2canvas(receipt, { scale: 2 });
            const pdf = new jsPDF('p', 'px', 'a4');
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 595, 842);
            pdf.save('receipt.pdf');
        };

        generatePDF();
    }, []);

    return (
        <div ref={receiptRef}>
            <section class="py-20 overflow-hidden relative">
                <div class="inline-block absolute 2xl:end-60 bottom-3 xl:bottom-auto">
                    <a href="javascript:window.print()" class="flex items-center justify-end py-2 px-7 rounded-md bg-white print:hidden">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="pe-3">
                                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                        </span>
                        Print
                    </a>
                </div>

                <div class="container">
                    <div>
                        <div class="flex flex-wrap items-center rounded-t-3xl justify-between gap-6 bg-indigo-400 p-8 relative after:rotate-[133deg] after:rounded-ss-none after:-bottom-3 after:start-[50%] after:absolute after:border-[25px] after:border-t-indigo-400 after:border-e-indigo-400 after:border-transparent">
                            <img src={props.logo} alt="" />
                            <h4 class="text-5xl font-semibold uppercase tracking-widest text-white float-right">Invoice</h4>
                        </div>
                        <div class="bg-white md:p-16 p-10">
                            <div class="flex flex-wrap items-center justify-between gap-6">
                                <div class="flex gap-3">
                                    <h1 class="text-xl font-semibold tracking-widest">Invoice to:</h1>
                                    <div>
                                        <h4 class="text-lg font-semibold">{props.customerName}</h4>
                                        <p class="w-52 text-sm font-medium text-gray-500 mt-2">{props.customerAddress}</p>
                                    </div>
                                </div>

                                <div>
                                    <p class="text-xl font-semibold">Invoice #: <span class="ps-5 text-gray-500">{props.invoiceNumber}</span></p>
                                    <p class="text-xl font-semibold">Date: <span class="ps-5 text-gray-500">{props.date}</span></p>
                                </div>
                            </div>

                            <div class="overflow-x-auto">
                                <table class="border-gray-400 table-auto w-full text-sm mt-14 mb-12 whitespace-pre">
                                    <thead>
                                        <tr>
                                            <th class="p-4 uppercase tracking-widest text-lg font-medium text-start">SL.</th>
                                            <th class="p-4 uppercase tracking-widest text-lg font-medium text-start">Item Description</th>
                                            <th class="p-4 uppercase tracking-widest text-lg font-medium text-start">Price</th>
                                            <th class="p-4 pe-7 uppercase tracking-widest text-lg font-medium text-center">Qty</th>
                                            <th class="p-4 uppercase tracking-widest text-lg font-medium text-end">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        {props.items.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : ""}>
                                                <td class="p-5 border-b border-gray-400 text-base font-medium">{index + 1}</td>
                                                <td class="p-5 border-b border-gray-400 text-base font-medium">{item.description}</td>
                                                <td class="p-5 border-b border-gray-400 text-base font-medium">{item.price}</td>
                                                <td class="p-5 border-b border-gray-400 text-base font-medium text-center">{item.quantity}</td>
                                                <td class="p-5 border-b border-gray-400 text-base font-medium text-end">{item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div class="flex flex-wrap justify-between gap-6 mb-5">
                                <div>
                                    <h1 class="text-xl font-semibold">Thank you for your business</h1>

                                    <p class="text-base font-medium text-sky-500 mt-5">Payment info:</p>
                                    <p class="text-sm font-normal pt-2">Account #: {props.accountNumber}</p>
                                    <p class="text-sm font-normal">A/c Name: {props.accountName}</p>
                                    <p class="text-sm font-normal">Bank Details: {props.bankDetails}</p>
                                </div>

                                <div>
                                    <div class="flex flex-wrap items-center justify-end">
                                        <div>
                                            <h2 class="pb-1 text-base font-normal">Sub total:</h2>
                                            <h2 class="pb-4 text-base font-normal">Tax:</h2>
                                            <h2 class=" py-3 text-base font-medium border-t border-gray-500 text-sky-500">Total:</h2>
                                        </div>
                                        <div>
                                            <h4 class="ps-7 pb-1 text-base font-medium text-end">{props.subtotal}</h4>
                                            <h4 class="ps-7 pb-4 text-base font-medium text-end">{props.tax}</h4>
                                            <h4 class="py-3 text-base font-medium text-end border-t border-gray-500 text-sky-500">{props.total}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="w-40 border border-gray-500 mt-1" />
                            <h3 class="text-xl font-semibold border-gray-500">Authorised Sign</h3>
                        </div>
                        <div class="bg-indigo-400 p-6 relative rounded-3xl after:-rotate-45 rounded-tr-none rounded-ss-none after:-top-3 after:start-[50%] after:absolute after:border-[25px] after:border-t-indigo-400 after:border-e-indigo-400 after:border-transparent"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReceiptPage;
