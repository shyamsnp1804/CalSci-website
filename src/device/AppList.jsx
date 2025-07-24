import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '../configSupabase/config';
import AppUpdateModal from './AppUpdateModal';
import AppCodePreview from './AppCodePreview';

const AppList = ({ macAddress }) => {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const fetchApps = async () => {
    try {
      setIsLoading(true);
      if (!macAddress || !/^[0-9A-Fa-f:]{12,17}$/.test(macAddress)) {
        throw new Error('Invalid MAC address');
      }

      const cleanMac = macAddress.toLowerCase().replace(/:/g, '');
      const { data, error } = await supabase
        .from(`device_${cleanMac}`)
        .select('app_name, status, description');

      if (error) {
        console.error('AppList: Fetch apps error:', error.message);
        throw new Error(`Failed to fetch apps: ${error.message}`);
      }

      setApps(data || []);
      setIsLoading(false);
    } catch (err) {
      console.error('AppList: Fetch error:', err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [macAddress]);

  const handleUpdate = (appName) => {
    setSelectedApp(appName);
    setShowUpdateModal(true);
  };

  const handlePreview = (appName) => {
    setSelectedApp(appName);
    setShowPreviewModal(true);
  };

  const handleDelete = async (appName) => {
    try {
      const cleanMac = macAddress.toLowerCase().replace(/:/g, '');
      const { error } = await supabase
        .from(`device_${cleanMac}`)
        .delete()
        .eq('app_name', appName);

      if (error) {
        console.error('AppList: Delete error:', error.message);
        throw new Error(`Failed to delete app: ${error.message}`);
      }

      await fetchApps(); // Re-fetch after delete
    } catch (err) {
      console.error('AppList: Delete error:', err.message);
      setError(err.message);
    }
  };

  const handleUpdateSuccess = () => {
    fetchApps(); // Re-fetch after update
    setShowUpdateModal(false);
    setSelectedApp(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delayChildren: 0.2, staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-2">
        Apps for Device: {macAddress}
      </h2>

      {isLoading ? (
        <div className="text-center text-blue-800">Loading apps...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : apps.length === 0 ? (
        <p className="text-center text-gray-600">No apps found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          {apps.map((app) => (
            <motion.div
              key={app.app_name}
              className="bg-blue-50/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 p-8 flex flex-col items-center"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">{app.app_name}</h3>
              <p className="text-gray-800 mb-4 text-center">{app.description || 'No description'}</p>
              <p className="text-gray-600 mb-6 text-center">
                Status: <span className={app.status === 'public' ? 'text-green-600' : 'text-blue-600'}>{app.status}</span>
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUpdate(app.app_name)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700"
                >
                  <Edit className="w-5 h-5" />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePreview(app.app_name)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700"
                >
                  <Eye className="w-5 h-5" />
                  View Code
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(app.app_name)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {showUpdateModal && selectedApp && (
        <AppUpdateModal
          macAddress={macAddress}
          appName={selectedApp}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateSuccess}
        />
      )}

      {showPreviewModal && selectedApp && (
        <AppCodePreview
          macAddress={macAddress}
          appName={selectedApp}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </motion.div>
  );
};

export default AppList;
