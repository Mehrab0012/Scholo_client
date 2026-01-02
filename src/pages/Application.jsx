import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Swal from 'sweetalert2';

const Application = () => {
    const { id } = useParams();
    const { user, setLoading } = useContext(AuthContext);
    const [appData, setAppData] = useState("");
    const [application, setApplication] = useState(null); // Changed to null for better logic check
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
console.log(appData)
    // Fetch scholarship data and check if user already applied to THIS scholarship
    useEffect(() => {
        const getData = async () => {
            try {
              
                const { data } = await api.get(`/scholarships/${id}`);
                setAppData(data);

                
                const res = await api.get(`/applications`, { 
                    params: { email: user.email } 
                });
                
         
                if (Array.isArray(res.data)) {
                    const existingApp = res.data.find(app => app.scholarshipId === id);
                    setApplication(existingApp);
                } else if (res.data && res.data.scholarshipId === id) {
                    setApplication(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch application data:", error);
            }
        };
        if (id && user?.email) getData();
    }, [id, user?.email]);

    // Prefill form values
    useEffect(() => {
        if (appData && user) {
            reset({
                providerImage: appData.providerImage,
                scholarshipId: id,
                userId: user.uid,
                userName: user.displayName || "",
                userEmail: user.email || "",
                universityName: appData.universityName || "", // Pre-fill from scholarship data
                scholarshipCategory: appData.scholarshipCategory || "Academic",
                degree: appData.degree || "Undergraduate",
                applicationFees: Number(appData.fee) + 12.5,
                serviceCharge: 12.5,
                applicationStatus: "pending",
                paymentStatus: "unpaid",
                applicationDate: new Date().toISOString().split('T')[0],
                phoneNumber: "",
                address: "",
                personalStatement: "",
                awarded:false
                
            });
        }
    }, [appData, user, id, reset]);

    // Handle duplicate application
    const handlePrevent = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Application Already Submitted",
            text: "You have already applied for this scholarship. Please visit your dashboard to view details.",
            icon: "warning",
            confirmButtonColor: "#2563eb",
            confirmButtonText: "Go to Dashboard",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) navigate("/dashboard");
        });
    };

    // Handle form submission & Stripe payment
    const onSubmit = async (data) => {
        Swal.fire({
            title: `You have to pay $${(Number(appData.fee) + 12.5).toFixed(2)}`,
            text: "You won't be able to get refund",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Apply"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);

                try {
                    // 1️⃣ Save application first with pending/unpaid status
                    // Note: Use 'email' key as expected by your backend check
                    const applicationRes = await api.post("/applications", {
                        ...data,
                        email: data.userEmail, 
                    });

                    // ⚠️ Get insertedId from backend response
                    const applicationId = applicationRes.data.insertedId || applicationRes.data.data?.insertedId;
                    
                    if (!applicationId) {
                        throw new Error("Application could not be initialized");
                    }

                    // 2️⃣ Create Stripe checkout session
                    const paymentInfo = {
                        productName: `${data.universityName} - ${data.userName}`,
                        scholarshipId: data.scholarshipId,
                        applicationFees: Number(appData.fee) + 12.5,
                        providerImage: data.providerImage,
                        senderEmail: data.userEmail,
                        applicationId: applicationId // Pass this to link Stripe and DB later
                    };

                    const postData = await api.post("/create-checkout-session", paymentInfo);
                    setLoading(false);

                    // 3️⃣ Redirect to Stripe checkout
                    window.location.href = postData.data.url;

                } catch (error) {
                    console.error(error);
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || error.message || 'Something went wrong.'
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen mt-16 lg:mt-32 flex flex-col font-sans bg-gray-50">
            {
                id ? <main className="flex-1 flex justify-center py-10 px-4 md:px-8">
                    <div className="w-full max-w-6xl flex flex-col gap-8">
                        {/* Header Section */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900">Scholarship Application</h1>
                            <p className="text-gray-600">Please fill in your details accurately to proceed.</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Form Section */}
                            <div className="flex-1 w-full">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                <FaEdit className="text-2xl text-blue-600" />
                                                Personal & Educational Details
                                            </h3>
                                        </div>

                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                                                <input
                                                    {...register("userName", { required: "Name is required" })}
                                                    className={`w-full rounded-lg bg-white border ${errors.userName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 h-11 px-4 placeholder-gray-400 transition-all outline-none`}
                                                    placeholder="John Doe"
                                                />
                                                {errors.userName && <span className="text-red-600 text-xs mt-1">{errors.userName.message}</span>}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                                                <input
                                                    readOnly // User email should typically be locked
                                                    {...register("userEmail", { required: "Email is required" })}
                                                    className={`w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-500 h-11 px-4 outline-none cursor-not-allowed`}
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                                                <input
                                                    {...register("phoneNumber", { required: "Phone number is required" })}
                                                    type="text"
                                                    onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                                                    className="w-full rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 h-11 px-4 placeholder-gray-400 transition-all outline-none"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>

                                            {/* Degree */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Target Degree</label>
                                                <select
                                                    {...register("degree")}
                                                    className="w-full rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 h-11 px-4 appearance-none transition-all cursor-pointer outline-none"
                                                >
                                                    <option value="Undergraduate">Undergraduate</option>
                                                    <option value="Postgraduate">Postgraduate</option>
                                                    <option value="PhD">PhD</option>
                                                </select>
                                            </div>

                                            {/* University */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">University Name</label>
                                                <input
                                                    {...register("universityName", { required: "University name is required" })}
                                                    className="w-full rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 h-11 px-4 placeholder-gray-400 transition-all outline-none"
                                                    placeholder="University of Excellence"
                                                />
                                            </div>

                                            {/* Address */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Home Address</label>
                                                <input
                                                    {...register("address", { required: "Address is required" })}
                                                    className="w-full rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 h-11 px-4 placeholder-gray-400 transition-all outline-none"
                                                    placeholder="123 Education St, Knowledge City"
                                                />
                                            </div>

                                            {/* Personal Statement */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-800 mb-2">Personal Statement</label>
                                                <textarea
                                                    {...register("personalStatement", { required: "Please provide a statement" })}
                                                    className="w-full min-h-80 p-4 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 placeholder-gray-400 transition-all resize-none outline-none"
                                                    placeholder="Explain why you deserve this scholarship..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button Logic */}
                                    <div className="flex justify-end gap-4 mt-3">
                                        {
                                            application ? (
                                                <button type="button" onClick={handlePrevent} className="px-10 h-12 rounded-lg bg-gray-400 text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2">
                                                    Already Applied <FaArrowRight />
                                                </button>
                                            ) : (
                                                <button type="submit" className="px-10 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2">
                                                    Submit Application <FaArrowRight />
                                                </button>
                                            )
                                        }
                                    </div>
                                </form>
                            </div>

                            {/* Sidebar Summary */}
                            <ScholarshipSummary amount={appData?.amount || 0} fees={appData?.fee || 0} charge={12.5} />
                        </div>
                    </div>
                </main> :
                <div className="flex justify-center items-center min-h-[60vh]">
                    <button className="btn btn-error" onClick={() => navigate(-1)}>Scholarship Not Found - Go Back</button>
                </div>
            }
        </div>
    );
};

const ScholarshipSummary = ({ amount, fees, charge }) => (
    <div className="w-full lg:w-80 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className='border py-5 px-5 mb-8 border-[#05050513] rounded-2xl shadow-md'>
            <h2 className='text-sm mb-1 text-[#6161618f] font-bold'>AWARD AMOUNT</h2>
            <div>
                <span className='text-5xl font-bold'><span className='text-[#1461123f]'>$</span>{amount}</span>
                <span>/year</span>
            </div>
        </div>
        <h3 className="font-bold text-lg mb-4 text-gray-900">Fee Summary</h3>
        <div className="flex justify-between mb-2 text-gray-600">
            <span>Application Fee</span>
            <span className="font-medium text-gray-900">${Number(fees).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 text-gray-600">
            <span>Service Charge</span>
            <span className="font-medium text-gray-900">${charge.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span className="text-blue-600">${(Number(fees) + charge).toFixed(2)}</span>
        </div>
    </div>
);

export default Application;