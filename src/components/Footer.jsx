import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">BuildProof</h3>
            <p className="text-sm text-gray-400 mb-4">
              Showcase projects, solve problems, and connect with recruiters — all in one platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-green-500 transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-500 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-green-500 transition">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Browse Projects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Find Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 BuildProof. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-500 transition">Privacy</a>
            <a href="#" className="hover:text-green-500 transition">Terms</a>
            <a href="#" className="hover:text-green-500 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
