
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router';

const Login = () => {

    const [show, setShow] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 mt-10">

            <form className="space-y-5">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="email">Email</label>
                    <div className="relative">

                        <input
                            className="w-full h-12 pl-5 pr-4 rounded-xl border border-[#dbe0e6] bg-white text-[#111418] placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            id="email"
                            placeholder="name@university.edu"
                            type="email"
                        />
                    </div>
                </div>

                <div className="space-y-1">

                    <div >
                        <label className="text-sm font-semibold text-[#111418]" htmlFor="email">Password</label>

                        <div className='relative'>
                            <input
                            className="w-full h-12 pl-5 pr-11 rounded-xl border  border-[#dbe0e6] bg-white text-[#111418] placeholder:text-secondary/50 
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            id="password"
                            placeholder="••••••••"
                            type={`${show ? 'text' : 'password'}`}
                        />
                        <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary/60 hover:text-secondary" type="button">
                            <IoMdEye onClick={() => setShow(show => !show)} className={`${show ? 'flex' : 'hidden'} text-2xl cursor-pointer`} />
                            <IoMdEyeOff onClick={() => setShow(show => !show)} className={`${show ? 'hidden' : 'flex'} text-2xl cursor-pointer`} />

                        </button>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 flex items-center justify-center rounded-xl text-lg text-blue-800 mt-10 
                 font-bold tracking-wide hover:bg-blue-200 cursor-pointer shadow-lg shadow-blue-500/20"
                    type="submit">
                    Log In
                </button>
            </form>



            <div className="text-center pt-2">
                <p className="text-sm text-secondary">
                    Don't have an account?
                    <Link to={'/authentication/register'}><button  className="ml-1 font-bold text-blue-800 cursor-pointer hover:underline">Register</button></Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
