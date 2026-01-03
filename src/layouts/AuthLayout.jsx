
import React, { useContext, useEffect, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import api from '../api/axios';

const AuthLayout = () => {
    const { setUser, signInWithGoogle } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                try {
                    const user = result.user;
                    setUser(user);


                    await api.post("/users", {
                        name: user?.displayName || "",
                        email: user?.email || "",
                        photoURL: user?.photoURL || "",
                        role: "student",
                    });


                    const jwtRes = await api.post("/jwt", {
                        email: user?.email,
                    });

                    localStorage.setItem("access-token", jwtRes.data.token);

                    toast.success("Login successful 🎉", {
                        autoClose: 3000,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    navigate(from, { replace: true });

                } catch (error) {
                    console.log(error);
                    toast.error("Login failed");
                }
            })
            .catch(error => {
                if (error.code === "auth/popup-closed-by-user") {
                    toast.error("Sign in popup closed");
                } else if (error.code === "auth/cancelled-popup-request") {
                    toast.error("Popup request cancelled");
                } else if (error.code === "auth/account-exists-with-different-credential") {
                    toast.error("Account already exists with different sign-in method");
                } else if (error.code === "auth/network-request-failed") {
                    toast.error("Network error. Please check your internet");
                } else if (error.code === "auth/too-many-requests") {
                    toast.error("Too many attempts. Try again later");
                } else {
                    toast.error("Something went wrong. Please try again");
                }
            });
    };


    const [active, setActive] = useState("logIn");


    useEffect(() => {
        if (location.pathname.includes("logIn")) {
            setActive("logIn")

        }
        if (location.pathname.includes("register")) {
            setActive("register");

        }
    }, [location.pathname,]);


    return (
        <div className="w-full max-w-[1100px] m-auto mt-40 mb-40 bg-white rounded-2xl shadow-xl max-lg:px-3 overflow-hidden flex flex-col md:flex-row min-h-[680px]">
            {/* Left Branding Side */}
            <ToastContainer />
            <div
                className="hidden md:flex md:w-5/12 lg:w-1/2 px-14 py-30 relative flex-col gap-20   text-white bg-cover bg-center overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(19, 127, 236, 0.85), rgba(16, 25, 34, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUj5ZQVzuZ0gjBwnZnHjtcfm5zb5B_bOicU-xeC-XuBh0nKYk6SqL77HhLyg5eZO0wDIMsgxlilDWD4-gBKsHpGmq59JGjB40p1H48hotYR1xSwzTOf7Koi3OQNslIQOdbg3a8kne36gZhMan6nZcznUQyhrOxN0pYKuoE41SKA43K9v_TVgAoRSyyF4TURcWlychMGWyRek7ZTAbvELk9cN5LiLIqCyoqzWeDo5GqyjSTCXBkof9zFgZ6nxMwLnkiDePjxGrJN0kx')`
                }}
            >
                <div className="relative z-10">

                    <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-5 max-w-sm">
                        Connecting Students to their Future
                    </h1>
                    <p className="text-white/80 text-lg font-light leading-relaxed max-w-md">
                        Join ScholarStream to access thousands of scholarship opportunities tailored specifically to your academic profile and achievements.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col gap-4 mt-5">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/90"><IoIosCheckmarkCircleOutline className='text-2xl' /></span>
                        <span className="text-sm font-medium">Personalized Matches</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/90"><IoIosCheckmarkCircleOutline className='text-2xl' /></span>
                        <span className="text-sm font-medium">Direct University Applications</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/90"><IoIosCheckmarkCircleOutline className='text-2xl' /></span>
                        <span className="text-sm font-medium">Track Your Progress</span>
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>

            {/* Right Content Side */}
            <div className="w-full md:w-7/12 lg:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white overflow-y-auto custom-scrollbar">
                <div className="max-w-[420px] mx-auto w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl  font-bold text-[#111418] ">Welcome Back</h2>
                        <p className="text-secondary text-sm mt-2">Log in to your account to continue.</p>
                    </div>

                    <div className="relative flex p-1 bg-[#f0f2f4] rounded-xl w-full">

                        {/* Sliding background */}
                        <div
                            className={`
                            absolute top-1 left-1 h-[38px] w-[calc(50%-0.25rem)] 
                            bg-white rounded-lg shadow-md transition-all duration-300
                            ${active === "logIn" ? "translate-x-0" : "translate-x-full"}
                            `}
                        />

                        {/* Login Link */}
                        <Link
                            to="logIn"
                            onClick={() => setActive("logIn")}
                            className={`flex-1 z-10 py-2 px-4 text-sm font-semibold text-center transition-colors duration-300
                            ${active === "logIn" ? "text-blue-400" : "text-black"}`}
                        >
                            Log In
                        </Link>

                        {/* Register Link */}
                        <Link
                            to="register"
                            onClick={() => setActive("register")}
                            className={`flex-1 z-10 py-2 px-4 text-sm font-semibold text-center transition-colors duration-300
                            ${active === "register" ? "text-blue-400" : "text-black"}`}
                        >
                            Register
                        </Link>
                    </div>

                    <Outlet></Outlet>
                    <div className="relative mt-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#7ea5f5]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-3 text-secondary">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        <button onClick={handleGoogleSignIn} className="flex-1 py-3 flex items-center cursor-pointer justify-center gap-3 rounded-xl border border-[#dbe0e6] hover:bg-gray-50 transition-all bg-white">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            <span className="text-sm font-semibold text-[#111418]">Google</span>
                        </button>

                    </div>
                    <div className="flex justify-center gap-5 mt-5 text-blue-700">
                        <a className="text-xs text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="text-xs text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
