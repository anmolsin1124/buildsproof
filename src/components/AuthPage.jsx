import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../index.css';
import Navbar from './Navbar';
import Footer from './Footer';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if should show login or signup based on the route
  const shouldShowLogin = location.pathname === '/login' || location.pathname === '/auth';
  const [isLogin, setIsLogin] = useState(shouldShowLogin);

  // Login State
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup State
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login Handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    // Add your login logic here
  };

  // Signup Handlers
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Store user data and navigate to role page
    localStorage.setItem('userData', JSON.stringify(signupData));
    navigate('/role');
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Toggle Tabs */}
          <div className="flex gap-3 mb-10 bg-gray-100 p-1.5 rounded-full">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-full font-semibold transition duration-300 ${
                isLogin
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-full font-semibold transition duration-300 ${
                !isLogin
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Sign in to BuildProof to continue</p>
              </div>

              {/* Login Form */}
              <form className="space-y-5" onSubmit={handleLoginSubmit}>
                {/* Email Input */}
                <div>
                  <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                      {showLoginPassword ? '👁️' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                    />
                    <span className="ml-2 text-gray-700 font-medium">Remember me</span>
                  </label>
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 text-base rounded-lg font-bold hover:bg-green-700 transition cursor-pointer mt-8 shadow-md"
                >
                  Sign In
                </button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-600">Or continue with</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="flex gap-4 justify-center">
                  <button type="button" className="w-16 h-16 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-2xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.5 12.25c0-.612-.04-1.207-.12-1.787H12v3.375h6.2c-.26 1.375-1.056 2.546-2.242 3.328v2.769h3.633c2.122-1.957 3.343-4.84 3.343-8.285z" fill="#1f2937"/>
                      <path d="M12 23c3.013 0 5.537-1.002 7.383-2.708l-3.633-2.77c-.995.665-2.267 1.062-3.75 1.062-2.886 0-5.33-1.95-6.208-4.57H2.18v2.85C3.956 20.029 7.7 23 12 23z" fill="#34a853"/>
                      <path d="M5.792 14.014c-.22-.665-.348-1.373-.348-2.114s.128-1.449.348-2.114V6.852H2.18C1.43 8.55 1 10.229 1 12s.43 3.45 1.18 5.148l3.612-2.82z" fill="#ea4335"/>
                      <path d="M12 5.248c1.603 0 3.05.56 4.186 1.648l3.133-3.132C17.462 2.12 14.936 1 12 1 7.7 1 3.956 3.971 2.18 8.148l3.612 2.82c.877-2.62 3.322-4.72 6.208-4.72z" fill="#4285f4"/>
                    </svg>
                  </button>
                  <button type="button" className="w-16 h-16 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-2xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1f2937"/>
                    </svg>
                  </button>
                  <button type="button" className="w-16 h-16 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-2xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="#0a66c2"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Signup Form
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Join BuildProof</h2>
                <p className="text-gray-600 text-sm">Create your account and start showcasing your work</p>
              </div>

              {/* Signup Form */}
              <form className="space-y-5" onSubmit={handleSignupSubmit}>
                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showSignupPassword ? 'text' : 'password'}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                      {showSignupPassword ? '👁️' : '👁️'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">Minimum 8 characters</p>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                      {showConfirmPassword ? '👁️' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={signupData.acceptTerms}
                    onChange={handleSignupChange}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500 cursor-pointer mt-1"
                    required
                  />
                  <span className="ml-3 text-xs text-gray-600 leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 text-base rounded-lg font-bold hover:bg-green-700 transition cursor-pointer mt-8 shadow-md"
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-600">Or continue with</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="flex gap-4 justify-center">
                  <button type="button" className="w-16 h-16 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-2xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.5 12.25c0-.612-.04-1.207-.12-1.787H12v3.375h6.2c-.26 1.375-1.056 2.546-2.242 3.328v2.769h3.633c2.122-1.957 3.343-4.84 3.343-8.285z" fill="#1f2937"/>
                      <path d="M12 23c3.013 0 5.537-1.002 7.383-2.708l-3.633-2.77c-.995.665-2.267 1.062-3.75 1.062-2.886 0-5.33-1.95-6.208-4.57H2.18v2.85C3.956 20.029 7.7 23 12 23z" fill="#34a853"/>
                      <path d="M5.792 14.014c-.22-.665-.348-1.373-.348-2.114s.128-1.449.348-2.114V6.852H2.18C1.43 8.55 1 10.229 1 12s.43 3.45 1.18 5.148l3.612-2.82z" fill="#ea4335"/>
                      <path d="M12 5.248c1.603 0 3.05.56 4.186 1.648l3.133-3.132C17.462 2.12 14.936 1 12 1 7.7 1 3.956 3.971 2.18 8.148l3.612 2.82c.877-2.62 3.322-4.72 6.208-4.72z" fill="#4285f4"/>
                    </svg>
                  </button>
                  <button type="button" className="w-16 h-16 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-2xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1f2937"/>
                    </svg>
                  </button>
                  <button type="button" className="w-16 h-16 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-2xl">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="#0a66c2"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;
