
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ['Browse Scholarships', 'Universities', 'About'];

  // Add shadow on scroll for a professional feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600
             text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
              </svg>
            </div>
            <Link to={'/'}>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Scholar<span className="text-indigo-600">Stream</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              item === "Browse Scholarships" ? <Link
                to={`/browse-scholarships`}
                key={item}
                className="text-[15px] font-medium text-slate-500 hover:text-indigo-600 transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link> :
              <Link
                to={`/${item.toLowerCase()}`}
                key={item}
                className="text-[15px] font-medium text-slate-500 hover:text-indigo-600 transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to={'/authentication/logIn'}>
              <button className=" cursor-pointer px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-200 transition-all active:scale-95">
                Log in
              </button>
            </Link>
            <Link to={'/authentication/register'}>
              <button className="bg-slate-900 cursor-pointer hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-200 transition-all active:scale-95">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 transition-all duration-300 origin-top lg:hidden
        ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
      `}>
        <nav className="lg:hidden flex flex-col justify-start  gap-10">
          {navItems.map((item) => (
            <Link
              to={`/${item.toLowerCase()}`}
              key={item}
              className="text-lg font-medium  text-slate-500 hover:text-indigo-600 transition-all relative group"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className='w-full flex mt-4 gap-2 px-1 md:px-20'>
          <span className='w-full'>
            <Link to={'/authentication/signIn'}>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold  shadow-lg shadow-indigo-100">
                Sign In
              </button>

            </Link>
          </span>
          <span className='w-full'>
            <Link to={'/authentication/register'}>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold  shadow-lg shadow-indigo-100">
                Register
              </button>

            </Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;