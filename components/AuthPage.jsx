"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff, HiArrowRight } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FormError, LoadingButton } from '@/components/FormFeedback';
import { createClient } from '@/utils/supabase/client';

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/role';
  const oauthError = searchParams.get('error');

  const [isLogin, setIsLogin] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [globalError, setGlobalError] = useState(oauthError ? 'OAuth sign-in failed. Please try again.' : null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Login State
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup State
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'developer',
    acceptTerms: false,
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupLoading, setSignupLoading] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const supabase = createClient();

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setRedirecting(true);
        router.push(redirectTo);
      }
    };
    checkSession();
  }, []);

  // Login Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginErrors({});
    setGlobalError(null);

    if (!loginData.email) return setLoginErrors({ email: 'Email is required' });
    if (!loginData.password) return setLoginErrors({ password: 'Password is required' });

    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setLoginErrors({ submit: 'Incorrect email or password. Please try again.' });
        } else if (error.message.includes('Email not confirmed')) {
          setLoginErrors({ submit: 'Please confirm your email before logging in.' });
        } else {
          setLoginErrors({ submit: error.message });
        }
        setLoginLoading(false);
        return;
      }

      setRedirecting(true);
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setLoginErrors({ submit: 'Login failed. Please try again.' });
      setLoginLoading(false);
    }
  };

  // Signup Handler
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupErrors({});
    setGlobalError(null);

    const errors = {};
    if (!signupData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!signupData.email) errors.email = 'Email is required';
    if (!signupData.password || signupData.password.length < 8)
      errors.password = 'Password must be at least 8 characters';
    if (signupData.password !== signupData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';
    if (!signupData.acceptTerms) errors.acceptTerms = 'You must accept the Terms of Service';

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setSignupLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            name: signupData.fullName,
            full_name: signupData.fullName,
            role: signupData.role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/role`,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setSignupErrors({ submit: 'An account with this email already exists. Please log in.' });
        } else {
          setSignupErrors({ submit: error.message });
        }
        setSignupLoading(false);
        return;
      }

      setSuccessMessage('Account created! Check your email to confirm your account.');
      setSignupLoading(false);
    } catch (err) {
      setSignupErrors({ submit: 'Signup failed. Please try again.' });
      setSignupLoading(false);
    }
  };

  // Google OAuth Handler
  const handleGoogleSignIn = async () => {
    setGlobalError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) setGlobalError('Google sign-in failed. Please try again.');
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50/50">
      {/* Redirecting Overlay */}
      {redirecting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-100 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-bold text-gray-900">Preparing your experience...</p>
          </div>
        </div>
      )}

      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-xl shadow-green-500/5 border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
            {/* Toggle Tabs */}
            <div className="flex p-2 bg-gray-50/80 border-b border-gray-100">
              <button
                onClick={() => { setIsLogin(true); setGlobalError(null); setSuccessMessage(null); }}
                className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isLogin ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setIsLogin(false); setGlobalError(null); setSuccessMessage(null); }}
                className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  !isLogin ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="p-8 sm:p-10">
              {/* Global Error */}
              {globalError && (
                <div className="mb-6 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-600">
                  <span className="text-lg">⚠️</span>
                  <p className="text-sm font-semibold">{globalError}</p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3 text-green-700">
                  <span className="text-lg">✅</span>
                  <p className="text-sm font-semibold">{successMessage}</p>
                </div>
              )}

              {/* Login Form */}
              {isLogin ? (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-left">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
                    <p className="text-gray-500 mt-2 font-medium">Continue your journey with BuildProof</p>
                  </div>

                  {loginErrors.submit && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-600">
                      <span className="text-lg">⚠️</span>
                      <p className="text-sm font-semibold">{loginErrors.submit}</p>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleLoginSubmit}>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                          <HiMail size={20} />
                        </div>
                        <input
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          placeholder="name@company.com"
                          className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/5 transition-all duration-300 ${
                            loginErrors.email ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-green-500'
                          }`}
                          required
                        />
                      </div>
                      <FormError message={loginErrors.email} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-1">
                        <label className="text-sm font-bold text-gray-700">Password</label>
                        <a href="#" className="text-xs font-bold text-green-600 hover:text-green-700">Forgot?</a>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                          <HiLockClosed size={20} />
                        </div>
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          placeholder="••••••••"
                          className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/5 transition-all duration-300 ${
                            loginErrors.password ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-green-500'
                          }`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showLoginPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                      </div>
                      <FormError message={loginErrors.password} />
                    </div>

                    <LoadingButton
                      type="submit"
                      loading={loginLoading}
                      disabled={loginLoading}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Sign In <HiArrowRight />
                    </LoadingButton>
                  </form>
                </div>
              ) : (
                // Signup Form
                <div className="space-y-6 animate-fade-in">
                  <div className="text-left">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create account</h2>
                    <p className="text-gray-500 mt-2 font-medium">Join thousands of builders on BuildProof</p>
                  </div>

                  {signupErrors.submit && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 text-red-600">
                      <span className="text-lg">⚠️</span>
                      <p className="text-sm font-semibold">{signupErrors.submit}</p>
                    </div>
                  )}

                  <form className="space-y-5" onSubmit={handleSignupSubmit}>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                          <HiUser size={20} />
                        </div>
                        <input
                          type="text"
                          value={signupData.fullName}
                          onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/5 transition-all duration-300 ${
                            signupErrors.fullName ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-green-500'
                          }`}
                          required
                        />
                      </div>
                      <FormError message={signupErrors.fullName} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                          <HiMail size={20} />
                        </div>
                        <input
                          type="email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          placeholder="name@company.com"
                          className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/5 transition-all duration-300 ${
                            signupErrors.email ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-green-500'
                          }`}
                          required
                        />
                      </div>
                      <FormError message={signupErrors.email} />
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">I am a...</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, role: 'developer' })}
                          className={`py-3 px-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 ${
                            signupData.role === 'developer'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          🧑‍💻 Developer
                        </button>
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, role: 'recruiter' })}
                          className={`py-3 px-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 ${
                            signupData.role === 'recruiter'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          🏢 Recruiter / HR
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                          <input
                            type={showSignupPassword ? 'text' : 'password'}
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            placeholder="••••••••"
                            className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/5 transition-all duration-300 ${
                              signupErrors.password ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-green-500'
                            }`}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Confirm</label>
                        <div className="relative group">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/5 transition-all duration-300 ${
                              signupErrors.confirmPassword ? 'border-red-200 focus:border-red-500' : 'border-transparent focus:border-green-500'
                            }`}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {(signupErrors.password || signupErrors.confirmPassword) && (
                      <div className="flex flex-col gap-1">
                        <FormError message={signupErrors.password} />
                        <FormError message={signupErrors.confirmPassword} />
                      </div>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={signupData.acceptTerms}
                        onChange={(e) => setSignupData({ ...signupData, acceptTerms: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 transition-all"
                        required
                      />
                      <span className="text-xs text-gray-500 leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
                        I agree to the <a href="#" className="text-green-600 font-bold hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-green-600 font-bold hover:underline">Privacy Policy</a>.
                      </span>
                    </label>
                    <FormError message={signupErrors.acceptTerms} />

                    <LoadingButton
                      type="submit"
                      loading={signupLoading}
                      disabled={signupLoading}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                    >
                      Create Account <HiArrowRight />
                    </LoadingButton>
                  </form>
                </div>
              )}

              {/* Social Login Section */}
              <div className="mt-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-gray-400">
                    <span className="px-4 bg-white">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold text-gray-700"
                >
                  <FcGoogle size={22} />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Build with passion. Verify with BuildProof.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;
