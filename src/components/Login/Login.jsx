import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

const Login = () => {
    const [show, setShow] = useState(false);
    const { signIn, setLoading } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // 1. Firebase Sign In
            const result = await signIn(data.email, data.password);
            const user = result.user;

            // 2. Get JWT Token
            const { data: jwtResponse } = await api.post('/jwt', { email: user.email });

            if (jwtResponse.token) {
                // 3. Store token in localStorage
                localStorage.setItem('access-token', jwtResponse.token);

                // 4. Make protected request AFTER token is stored
                await api.patch("/users/login-update", { email: user.email });
            }

            toast.success("Welcome back!");
            setLoading(false);
            navigate(from, { replace: true });

        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 mt-10">
            <ToastContainer />

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="email">Email</label>
                    <input
                        {...register("email", { required: "Email is required" })}
                        className={`w-full h-12 px-5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#dbe0e6]'} bg-white 
                        text-[#111418] placeholder:text-secondary/50 text-sm transition-all
                        focus:outline-none focus:ring-2 focus:ring-blue-300`}
                        id="email"
                        placeholder="name@university.edu"
                        type="email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="password">Password</label>
                    <div className='relative'>
                        <input
                            {...register("password", { required: "Password is required" })}
                            className={`w-full h-12 pl-5 pr-11 rounded-xl border ${errors.password ? 'border-red-500' : 'border-[#dbe0e6]'} bg-white 
                            text-[#111418] placeholder:text-secondary/50 text-sm transition-all
                            focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            id="password"
                            placeholder="••••••••"
                            type={show ? "text" : "password"}
                        />
                        <button
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary/60 hover:text-secondary"
                            type="button"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <IoMdEye className="text-2xl cursor-pointer" /> : <IoMdEyeOff className="text-2xl cursor-pointer" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Login Button */}
                <button
                    className="w-full py-4 flex items-center justify-center rounded-xl text-lg text-blue-800 mt-10 
                    font-bold tracking-wide bg-blue-100 hover:bg-blue-200 cursor-pointer shadow-lg shadow-blue-500/20 transition-all"
                    type="submit"
                >
                    Log In
                </button>
            </form>

            {/* Footer */}
            <div className="text-center pt-2">
                <p className="text-sm text-secondary">
                    Don't have an account?
                    <Link to={'/authentication/register'}>
                        <span className="ml-1 font-bold text-blue-800 cursor-pointer hover:underline">Register</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;