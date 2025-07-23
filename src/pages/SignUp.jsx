import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../configSupabase/config';

const SignUp = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <UserPlus className="w-12 h-12 text-blue-600 animate-pulse" />
          <p className="mt-4 text-lg text-blue-700">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
          data: { username },
        },
      });

      if (error) {
        setMessage(error.message);
        setIsSuccess(false);
      } else if (data.user && !data.user.confirmed_at) {
        setMessage('Please check your email for a verification link from CalSci.');
        setIsSuccess(true);
        setTimeout(() => navigate('/signin'), 5000);
      } else {
        setMessage('Unexpected response from server.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      setIsSuccess(false);
      console.error('Sign-up error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900 flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-lg border border-blue-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 flex items-center justify-center gap-2">
            <UserPlus className="w-8 h-8 text-blue-600" />
            Create Your Account
          </h1>
          <p className="mt-2 text-lg text-blue-700">
            Join CalSci to start building IoT solutions
          </p>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="relative">
            <User className="absolute top-3 left-3 text-blue-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <Mail className="absolute top-3 left-3 text-blue-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <Lock className="absolute top-3 left-3 text-blue-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-medium shadow-md transition-colors ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isSubmitting}
          >
            <UserPlus className="w-5 h-5" />
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </motion.button>
        </form>

        {message && (
          <motion.p
            variants={itemVariants}
            className={`text-sm text-center mt-4 ${
              isSuccess ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </motion.p>
        )}

        <motion.p
          variants={itemVariants}
          className="text-sm text-center text-blue-800 mt-6"
        >
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;
