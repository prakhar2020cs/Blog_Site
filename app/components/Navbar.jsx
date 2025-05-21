"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = ({ logo }) => {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav
            className="text-white fixed top-0 left-0 z-50"
            style={{
                width: '100vw',
                height: '190px',
                backgroundColor: '#19001C',
                padding: '60px 85px',
                boxSizing: 'border-box',
            }}
        >
            <div className="flex justify-between items-center h-full">
                {/* Logo + Subtitle */}
                <div className="flex flex-col items-start">
                    <img src="/logo.png" alt="Bruno Language Learning" className="h-18" />
                </div>

                {/* Desktop Menu */}
                <div
                    className="hidden font-[Afacad] text-[20px] md:flex gap-15px items-center space-x-8 ml-auto"
                    style={{ width: '695px' }}
                >
                    <a href="#" className="hover:text-purple-300">Home</a>
                    <a href="#" className="hover:text-purple-300 whitespace-nowrap">About Us</a>
                    <a href="#" className="hover:text-purple-300 ">Blog</a>
                    <a href="#" className="hover:text-purple-300">Resources</a>
                    <a href="#" className="hover:text-purple-300 whitespace-nowrap">Contact Us</a>
                    <button
                        className="text-white px-4 py-2 mt-2 rounded-md w-full hover:opacity-90 transition duration-300"
                        style={{
                            background: 'linear-gradient(90deg, #532959, #824D69, #532959)'
                        }}
                    >
                        Schedule a call
                    </button>
                    <button
                    onClick={()=>router.push("/login")}
                        className="text-white px-4 py-2 mt-2 rounded-md w-full hover:opacity-90 transition duration-300"
                        style={{
                            background: 'linear-gradient(90deg, #532959, #824D69, #532959)'
                        }}
                    >
                        Admin Login
                    </button>
                </div>


                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden pt-4 pb-2 px-2">
                    <a href="#" className="block py-2 px-2 hover:bg-purple-800 rounded">Home</a>
                    <a href="#" className="block py-2 px-2 hover:bg-purple-800 rounded">About Us</a>
                    <a href="#" className="block py-2 px-2 hover:bg-purple-800 rounded font-bold">Blog</a>
                    <a href="#" className="block py-2 px-2 hover:bg-purple-800 rounded">Resources</a>
                    <a href="#" className="block py-2 px-2 hover:bg-purple-800 rounded">Contact Us</a>
                    <button className="bg-purple-600 text-white px-4 py-2 mt-2 rounded-md w-full hover:bg-purple-500">
                        Schedule a call
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
