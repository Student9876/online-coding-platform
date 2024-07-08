"use client"
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <div className="group cursor-pointer">
                            <div className="text-white font-bold text-xl transition duration-300 ease-in-out transform group-hover:scale-110">
                                Logo
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link href="/online-ide" legacyBehavior>
                        <div className="group cursor-pointer">
                            <div className="text-white transition duration-300 ease-in-out transform group-hover:scale-110">
                                <a className="text-white">Online IDE</a>
                            </div>
                        </div>
                    </Link>
                    <Link href="/login" legacyBehavior>
                        <div className="group cursor-pointer">
                            <div className="text-white transition duration-300 ease-in-out transform group-hover:scale-110">
                                <a className="text-white">Login</a>
                            </div>
                        </div>
                    </Link>
                    <Link href="/signup" legacyBehavior>
                        <div className="group cursor-pointer">
                            <div className="text-white transition duration-300 ease-in-out transform group-hover:scale-110">

                                <a className="text-white">Sign Up</a>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleNavbar} className="text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2">
                    <Link href="/online-ide" legacyBehavior>
                        <a className="block text-white py-2">Online IDE</a>
                    </Link>
                    <Link href="/login" legacyBehavior>
                        <a className="block text-white py-2">Login</a>
                    </Link>
                    <Link href="/signup" legacyBehavior>
                        <a className="block text-white py-2">Sign Up</a>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;