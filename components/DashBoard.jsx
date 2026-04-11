"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const DashBoard = () => {
  const router = useRouter();
  
  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <Navbar />
      <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-center pt-16">
        {/* Background Image Wrapper */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src="/DashBoard.png" 
            alt="Dashboard Hero" 
            fill
            className="object-cover opacity-90 scale-105 animate-subtle-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white/95 lg:via-white/70"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
              Get Hired Based on Your 
              <span className="text-green-500 block sm:inline"> Real Work,</span>
              <br className="hidden sm:block" />
              Not Just Resumes
            </h2>
            <p className="text-gray-600 text-base sm:text-xl mb-10 leading-relaxed max-w-xl font-medium">
              Showcase projects, solve problems, and connect with recruiters 
              — all in one unified platform built for the modern developer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button 
                onClick={() => router.push('/auth')} 
                className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/25 active:scale-95 transform"
              >
                Get Started
              </button>
              <button 
                onClick={() => router.push('/dashboard')} 
                className="w-full sm:w-auto bg-white text-green-600 border-2 border-green-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-md active:scale-95 transform"
              >
                Explore Projects
              </button>
              <button 
                onClick={() => router.push('/auth')}
                className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg active:scale-95 transform sm:ml-2"
              >
                Prove your Skill
              </button>
            </div>

            {/* Trust Badges / Stats */}
            <div className="mt-12 flex items-center gap-6 text-gray-400">
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-xl tracking-tight">10k+</span>
                <span className="text-xs uppercase font-semibold">Developers</span>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-xl tracking-tight">500+</span>
                <span className="text-xs uppercase font-semibold">Companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
