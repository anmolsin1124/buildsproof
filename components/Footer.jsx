import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-white text-2xl font-bold tracking-tight">Build</span>
              <span className="text-green-500 text-2xl font-bold tracking-tight">Proof</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              The premier platform for developers to showcase real-world projects, solve complex problems, and get noticed by top recruiters.
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-110">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-110">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-110">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-110">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-green-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Browse Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Find Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-green-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-green-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 hover:translate-x-1 transition-all inline-block">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} BuildProof. Designed for the modern builder.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
