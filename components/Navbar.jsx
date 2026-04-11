"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logoUrl = '/logo/file_0000000012bc7208b25009dfb0273ffb-removebg-preview.png';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '#' },
    { name: 'Practice', path: '#' },
    { name: 'About', path: '#' },
  ];

  return (
    <div className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${scrolled ? 'pt-2 px-4' : 'pt-4 px-4 sm:px-6 lg:px-8'}`}>
      <nav className={`mx-auto max-w-7xl rounded-full transition-all duration-500 ${scrolled
        ? 'bg-zinc-900/80 backdrop-blur-xl shadow-2xl border border-white/10 py-1.5 px-6'
        : 'bg-transparent border border-transparent py-4 px-2'
        }`}>
        <div className="flex justify-between items-center h-12 md:h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group z-50">
            <div className="relative">
              <img src={logoUrl} alt="BuildProof" className="h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
            </div>
            <div className="flex items-baseline">
              <span className={`text-xl sm:text-2xl font-black tracking-tight uppercase transition-colors duration-300 ${scrolled ? 'text-white' : 'text-black'}`}>
                Build
              </span>
              <span className="text-green-500 text-xl sm:text-2xl font-black tracking-tight uppercase relative group-hover:drop-shadow-[0_0_8px_rgba(52,211,150,0.4)] transition-all">Proof</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className={`flex items-center transition-all duration-300 rounded-full px-1.5 py-1 ${scrolled ? 'bg-white/5 border border-white/5' : ''}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="px-4 py-2 rounded-full text-zinc-400 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide relative group"
                >
                  {link.name}
                  <div className="absolute inset-x-0 h-0.5 bottom-1 w-0 mx-auto bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-1/2 transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4 z-50">
            <Link
              href="/auth"
              className="text-zinc-400 hover:text-white transition-colors font-medium text-sm tracking-wide"
            >
              Sign In
            </Link>
            <Link
              href="/auth"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full hover:shadow-[0_0_20px_rgba(52,211,150,0.4)] hover:-translate-y-0.5 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-sm uppercase tracking-wider bg-green-500 text-white relative z-10">Get Started</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2.5 text-white hover:text-emerald-400 focus:outline-none rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all active:scale-90"
            >
              {isOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`absolute top-20 left-4 right-4 md:hidden overflow-hidden transition-all duration-500 origin-top ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-2">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.path}
              className="flex items-center w-full px-4 py-3 text-base font-semibold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${isOpen ? idx * 40 : 0}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] w-full bg-white/10 my-1"></div>
          <div className="grid grid-cols-2 gap-3 p-1">
            <Link
              href="/auth"
              className="w-full text-center py-3 text-sm font-bold text-white border border-white/10 rounded-xl transition-all hover:bg-white/5 uppercase tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth"
              className="w-full text-center py-3 text-sm font-bold text-zinc-900 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl transition-all hover:opacity-90 uppercase tracking-wide shadow-[0_4px_15px_rgba(52,211,150,0.3)]"
              onClick={() => setIsOpen(false)}
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
