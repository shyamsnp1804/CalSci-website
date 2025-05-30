import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome, {user?.user_metadata?.userName || user?.email}!
        </h1>
        <p className="mt-4 text-gray-700">
          Your personal dashboard. Manage your settings or explore features.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;