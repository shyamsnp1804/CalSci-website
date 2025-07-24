import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Eye } from 'lucide-react';
import { supabase } from '../configSupabase/config';
import AppCodePreviewModal from '../device/AppCodePreviewModal';

const AppStore = () => {
  const [publicApps, setPublicApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const fetchPublicApps = async () => {
      try {
        setIsLoading(true);
        const { data: appData, error: appError } = await supabase
          .from('public_apps')
          .select('app_name, description, file_path, mac_address');

        if (appError) {
          console.error('AppStore: Fetch public apps error:', appError.message);
          throw new Error(`Failed to fetch public apps: ${appError.message}`);
        }

        setPublicApps(appData || []);
        setIsLoading(false);
      } catch (err) {
        console.error('AppStore: Fetch error:', err.message);
        setError(`Failed to load apps: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchPublicApps();
  }, []);

  const handleViewCode = (app) => {
    setSelectedApp(app);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
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
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 pt-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-12 flex items-center justify-center gap-3">
          <Code2 className="w-10 h-10 text-blue-600" />
          App Store
        </h1>

        {isLoading ? (
          <div className="text-center text-blue-800">Loading public apps...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : publicApps.length === 0 ? (
          <p className="text-center text-gray-600">No public apps available.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={itemVariants}
          >
            {publicApps.map((app, index) => (
              <motion.div
                key={`${app.mac_address}-${app.app_name}-${index}`}
                className="bg-blue-50/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 p-8 flex flex-col items-center"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">{app.app_name}</h2>
                <p className="text-gray-800 mb-6 text-center">{app.description || 'No description'}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewCode(app)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  View Code
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {showPreview && selectedApp && (
        <AppCodePreviewModal
          app={selectedApp}
          onClose={handleClosePreview}
        />
      )}
    </motion.div>
  );
};

export default AppStore;