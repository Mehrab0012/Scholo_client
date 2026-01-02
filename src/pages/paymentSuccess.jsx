import React, { useEffect, useState } from 'react';
import { useSearchParams,  Link } from 'react-router';
import { 
  HiCheckCircle, 
  HiCheck, 
  HiOutlineClipboard, 
  HiOutlineCreditCard 
} from 'react-icons/hi2'; // Ensure these are installed
import api from '../api/axios';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [productInfo, setProductInfo] = useState(null); // To store session data
    const [copied, setCopied] = useState(false); // For transaction ID copy feature

    // The transaction ID usually comes from the payment_intent in the session
    const transactionId = productInfo?.payment_intent;

    // Clipboard copy logic
    const handleCopy = () => {
        if (transactionId) {
            navigator.clipboard.writeText(transactionId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        if (!sessionId) return;

        const confirmPayment = async () => {
            try {
                const { data: session } = await api.post("/payment-success", { sessionId });
                setProductInfo(session); // Save data for UI display
                
              
                const applicationId = session.metadata?.applicationId;
                const tranId = session.payment_intent;

                if (applicationId) {
                    await api.patch(`/applications/payment-confirm/${applicationId}`, {
                        transactionId: tranId
                    });
                }

                setLoading(false);
        
            } catch (error) {
                console.error("Verification error:", error);
                setLoading(false);
                Swal.fire("Error", "Could not verify payment status.", "error");
            }
        };

        confirmPayment();
    }, [sessionId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-xl font-bold text-blue-600">Verifying Payment...</div>
        </div>
    );

    return (
        <div className="min-h-screen flex mt-16 lg:mt-32 flex-col items-center justify-center p-4 bg-[#f8fafc]">
            <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                <div className="h-2 w-full bg-[#137fec]"></div>

                <div className="p-8 md:p-12 flex flex-col items-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                            <HiCheckCircle className="w-14 h-14 text-green-500" />
                        </div>
                    </div>

                    <h1 className="text-[#0f172a] text-3xl md:text-4xl font-bold text-center mb-3">
                        Success! You're one step closer.
                    </h1>

                    <p className="text-slate-500 text-lg text-center mb-10">
                        We have received your application fee.
                    </p>

                    <div className="w-full bg-slate-50 rounded-2xl border p-6">
                        <div className="flex justify-between mb-6 border-b pb-4">
                            <h2 className="text-xs font-bold text-slate-400 uppercase">
                                Receipt Details
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Total Amount</span>
                                <span className="font-bold">
                                    {productInfo?.currency?.toUpperCase() === 'USD' && '$'}
                                    {(productInfo?.amount_total / 100).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Transaction ID</span>
                                <div onClick={handleCopy} className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                                    <span className="font-mono text-sm">{transactionId}</span>
                                    {copied ? (
                                        <HiCheck className="text-green-500" />
                                    ) : (
                                        <HiOutlineClipboard className="text-slate-400" />
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-600">Payment Status</span>
                                <div className="flex gap-2 items-center">
                                    <HiOutlineCreditCard className="text-blue-500" />
                                    <span className="capitalize font-medium text-green-600">
                                        {productInfo?.payment_status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full mt-8">
                        <Link className="w-full" to={'/dashboard'}>
                            <button className="w-full cursor-pointer bg-[#137fec] hover:bg-[#1069c5] transition-colors text-white rounded-xl h-12 font-bold">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;