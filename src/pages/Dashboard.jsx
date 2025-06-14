import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MacAddressForm from '../components/dashboard/MacAddressForm';
import { supabase } from '../configSupabase/config';

const EDGE_FUNCTION_URL = 'https://czxnvqwbwszzfgecpkbi.supabase.co/functions/v1/create-table';

const Dashboard = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const [macAddress, setMacAddress] = useState('');
  const [apps, setApps] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const username = user?.user_metadata?.username || 'User';

  const fetchApps = async (mac) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setFetchError('Unauthorized. Please sign in again.');
        return;
      }

      const response = await fetch(`${EDGE_FUNCTION_URL}?macAddress=${mac}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      const { data, error } = await response.json();
      if (!response.ok || error) {
        throw new Error(error || 'Failed to fetch apps');
      }

      setApps(data || []);
      setFetchError('');
    } catch (err) {
      setFetchError(err.message);
      setApps([]);
    }
  };

  const handleMacSubmit = (mac, message) => {
    setSuccessMessage(message);
    setMacAddress(mac);
    fetchApps(mac);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 flex flex-col pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="h-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
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
        <MacAddressForm onSubmit={handleMacSubmit} />
        {successMessage && (
          <motion.p
            className="text-green-600 mt-2 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {successMessage}
          </motion.p>
        )}
        {fetchError && (
          <motion.p
            className="text-red-600 mt-2 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {fetchError}
          </motion.p>
        )}
        {macAddress && (
          <motion.div
            className="mt-6 w-full max-w-4xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Apps for Device: {macAddress}</h3>
            {apps.length > 0 ? (
              <table className="w-full bg-white/90 rounded-lg shadow-lg border border-blue-200">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-left text-blue-800">App Name</th>
                    <th className="p-3 text-left text-blue-800">Folder Name</th>
                    <th className="p-3 text-left text-blue-800">Python Code</th>
                    <th className="p-3 text-left text-blue-800">Downloaded</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app, index) => (
                    <tr key={index} className="border-t border-blue-200">
                      <td className="p-3 text-gray-800">{app.app_name}</td>
                      <td className="p-3 text-gray-800">{app.folder_name}</td>
                      <td className="p-3 text-gray-800 truncate max-w-xs">{app.python_code}</td>
                      <td className="p-3 text-gray-800">{app.is_downloaded ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600 text-center">No apps found for this device.</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;