import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import api from '../../api/axios';

const Register = () => {
    const [show, setShow] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            role: 'student'
        }
    });

    const selectedRole = watch("role");
    const options = ["student"];
    const { createUser, setLoading } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";


    // UPLOAD IMAGE TO CLOUDINARY
    const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            const err = await res.json();
            console.error("Cloudinary upload error:", err);
            throw new Error(err.error?.message || "Upload failed");
        }

        const data = await res.json();
        return data.secure_url;
    };

const onSubmit = async (data) => {
    try {
        setLoading(true);
        setUploading(true);

        // 1. Upload image if exists
        let photoURL = "";
        if (imageFile) {
            photoURL = await uploadImageToCloudinary(imageFile);
        }

        // 2. Create User in Firebase
        const result = await createUser(data.email, data.password);
        await updateProfile(result.user, {
            displayName: data.fullName,
            photoURL: photoURL
        });

        // 3. Get JWT Token first 🔑
        const { data: jwtResponse } = await api.post('/jwt', { email: data.email });
        if (!jwtResponse.token) throw new Error("Failed to get access token");
        localStorage.setItem('access-token', jwtResponse.token);

        // 4. Save to MongoDB (protected route now works because token is set)
        await api.post("/users", {
            role: data.role,
            name: data.fullName,
            email: data.email,
            photoURL: photoURL
        });

        toast.success("Registration successful 🎉");
        setLoading(false);
        setUploading(false);
        navigate(from, { replace: true });

    } catch (error) {
        console.error("Registration error:", error);
        toast.error(error.response?.data?.message || error.message || "An error occurred");
        setLoading(false);
        setUploading(false);
    }
};

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <ToastContainer />
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-4 mt-10">
                    {options.map((option) => (
                        <label
                            key={option}
                            className={`flex justify-center items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all
                            ${selectedRole === option
                                    ? "border-primary bg-primary/5 text-blue-600"
                                    : "border-[#dbe0e6] hover:text-blue-800"
                                }`}
                        >
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </span>
                            <input
                                type="radio"
                                value={option}
                                className="hidden"
                                {...register("role")}
                            />
                        </label>
                    ))}
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="fullName">Full Name</label>
                    <input
                        className="w-full py-3 px-5 rounded-xl border border-[#dbe0e6] bg-white text-[#111418] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        id="fullName"
                        placeholder="Alex Johnson"
                        type="text"
                        required
                        {...register("fullName")}
                    />
                </div>

                {/* Organization Name (Conditional) */}


                {/* Photo Upload */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]">Profile Photo</label>
                    <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="block w-full cursor-pointer text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-xl file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="email">Email</label>
                    <input
                        className="w-full h-12 px-5 rounded-xl border border-[#dbe0e6] bg-white text-[#111418] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        id="email"
                        placeholder="name@university.edu"
                        type="email"
                        required
                        {...register("email")}
                    />
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="password">Password</label>
                    <div className='relative'>
                        <input
                            className="w-full h-12 pl-5 pr-11 rounded-xl border border-[#dbe0e6] bg-white text-[#111418] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            id="password"
                            placeholder="••••••••"
                            type={show ? 'text' : 'password'}
                            required
                            {...register("password")}
                        />
                        <button
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary/60 hover:text-secondary"
                            type="button"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <IoMdEye className="text-2xl" /> : <IoMdEyeOff className="text-2xl" />}
                        </button>
                    </div>
                </div>

                <button
                    disabled={uploading}
                    className={`w-full py-4 flex items-center justify-center rounded-xl text-lg text-blue-800 mt-10 
                    font-bold tracking-wide shadow-lg shadow-blue-500/20 transition-all
                    ${uploading ? "bg-gray-200 cursor-not-allowed" : "bg-blue-100 hover:bg-blue-200 cursor-pointer"}`}
                    type="submit">
                    {uploading ? "Processing..." : "Create Account"}
                </button>
            </form>

            <div className="text-center pt-2 space-y-3">
                <p className="text-sm text-secondary">
                    Already have an account?
                    <Link to={'/authentication/logIn'}>
                        <span className="ml-1 font-bold text-blue-800 cursor-pointer hover:underline">Log in</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;