import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MacAddressForm from '../components/dashboard/MacAddressForm';

const Dashboard = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const username = user?.user_metadata?.username || 'User';

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 flex flex-col px-4 sm:px-6 lg:px-8 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center h-1/2">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome, {username}
        </motion.h1>
        <motion.p
          className="text-lg text-blue-600 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          This is your dashboard.
        </motion.p>
      </div>
      <div className="h-1/2 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
        <MacAddressForm />
      </div>
    </motion.div>
  );
};

export default Dashboard;
