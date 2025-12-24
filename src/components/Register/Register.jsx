
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router';

const Register = () => {
    const [role, setRole] = useState('student');
    const [show, setShow] = useState(false);
    const options = ["student", "organization"];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">



            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4 mt-10">
                    {options.map((option) => (
                        <label
                            key={option}
                            className={`flex justify-center items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all
                            ${role === option
                                    ? "border-primary bg-primary/5 text-blue-600"
                                    : "border-[#dbe0e6] hover:text-blue-800"
                                }`}
                        >
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </span>
                            {/* Hidden radio input for form submission */}
                            <input
                                type="radio"
                                name="role"
                                value={option}
                                className="hidden"
                                checked={role === option}
                                onChange={() => setRole(option)}
                            />
                        </label>
                    ))}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-[#111418]" htmlFor="full-name">Full Name</label>
                    <div className="relative">

                        <input
                            className="w-full py-3 pl-5 pr-4 rounded-xl border border-[#dbe0e6] bg-white text-[#111418] placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            id="full-name"
                            placeholder="Alex Johnson"
                            type="text"
                        />
                    </div>
                </div>
                {
                    role === 'organization' && <div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#111418]" htmlFor="full-name">Organization Name</label>
                            <div className="relative">

                                <input
                                    className="w-full py-3 pl-5 pr-4 rounded-xl border border-[#dbe0e6] bg-white text-[#111418] placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    id="full-name"
                                    placeholder="xyz"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                }

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
                    Create Account
                </button>
            </form>



            <div className="text-center pt-2 space-y-3">
                <p className="text-sm text-secondary">
                    Already have an account?
                    <Link to={'/authentication/logIn'}><button className="ml-1 font-bold text-blue-800 cursor-pointer hover:underline">Log in</button></Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
