import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../configSupabase/config'; // Adjust the import path as necessary

const Verify = () => {
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Extract token and type from URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const token = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (!token || type !== 'signup') {
          setError('Invalid or missing verification link. Please request a new link.');
          return;
        }

        // Verify the OTP
        const { data, error } = await supabase.auth.verifyOtp({
          token,
          type: 'signup',
        });

        if (error) {
          setError(error.message);
          return;
        }

        // Store username in profiles table
        if (data.user && data.user.user_metadata.username) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              username: data.user.user_metadata.username,
              email: data.user.email,
            });

          if (profileError) {
            setError('Failed to save profile: ' + profileError.message);
            return;
          }
        } else {
          setError('Username not found in user data.');
          return;
        }

        setMessage('Email verified successfully! You can now sign in.');
        setTimeout(() => navigate('/signin'), 3000);
      } catch (err) {
        setError('An unexpected error occurred: ' + err.message);
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-6">
      <div className="max-w-md w-full backdrop-blur-lg bg-gradient-to-br from-sky-200 to-purple-300 border border-white/40 p-8 rounded-xl shadow-2xl text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
          Email Verification
        </h1>
        {message && (
          <p className="text-green-600 mb-4">{message}</p>
        )}
        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/signin')}
          className="bg-blue-500 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-blue-600 transition-colors"
        >
          Go to Sign In
        </motion.button>
      </div>
    </div>
  );
};

export default Verify;
