import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@privy-io/react-auth';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { FaApple, FaGithub, FaTwitter, FaWallet, FaEnvelope } from 'react-icons/fa';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { login: privyLogin, user, authenticated } = useLogin({
    onComplete: (user, isNewUser) => {
      handleLoginSuccess(user, isNewUser);
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  });

  const handleLoginSuccess = async (privyUser, isNewUser) => {
    try {
      setIsLoading(true);
      
      const userData = {
        id: privyUser.id,
        email: privyUser.email?.address || null,
        walletAddress: privyUser.wallet?.address || null,
        name: privyUser.email?.address?.split('@')[0] || 'User',
        isNewUser
      };

      login(userData);

      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Error during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = () => {
    setIsLoading(true);
    privyLogin({ method: 'email' });
  };

  const handleWalletLogin = () => {
    setIsLoading(true);
    privyLogin({ method: 'wallet' });
  };

  const handleAppleLogin = () => {
    setIsLoading(true);
    privyLogin({ method: 'apple' });
  };

  const handleTwitterLogin = () => {
    setIsLoading(true);
    privyLogin({ method: 'twitter' });
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    privyLogin({ method: 'github' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to TrustCare
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your healthcare dashboard
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* Email Login */}
          <button
            onClick={handleEmailLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                <FaEnvelope className="mr-2" />
                Continue with Email
              </>
            )}
          </button>

          {/* Wallet Login */}
          <button
            onClick={handleWalletLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
          >
            <FaWallet className="mr-2" />
            Connect Wallet
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAppleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaApple className="mr-2" />
              Apple
            </button>

            <button
              onClick={handleTwitterLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaTwitter className="mr-2 text-blue-400" />
              Twitter
            </button>

            <button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaGithub className="mr-2" />
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            By signing in, you agree to our{' '}
            <a href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
