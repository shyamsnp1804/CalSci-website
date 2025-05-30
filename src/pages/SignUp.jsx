import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signUpUser } from '../configSupabase/auth';

function SignUp() {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await signUpUser(username, email, password);
      setMessage(result.message);
      setIsSuccess(result.success);
      if (result.success) {
        navigate('/signin');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-purple-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md backdrop-blur-lg bg-gradient-to-br from-sky-200 to-purple-300 border border-white/40 p-8 rounded-xl shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-center text-blue-800 mb-2"
        >
          Create your account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-center text-gray-600 mb-6"
        >
          Join <span className="font-semibold text-blue-700">CalSci</span> and
          start calculating...
        </motion.p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <User className="absolute top-2.5 left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Mail className="absolute top-2.5 left-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Lock className="absolute top-2.5 left-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className={`w-full py-2 rounded text-white transition-colors ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`text-sm text-center mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-sm text-center text-gray-700 mt-5"
        >
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignUp;
