import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Trash2, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { supabase } from '../../configSupabase/config';

const DELETE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_DELETE_APP

const AppDeleteModal = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { macAddress, appName } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!macAddress || !/^[0-9A-Fa-f:]{12,17}$/.test(macAddress) || !appName) {
    console.error('AppDeleteModal: Invalid or missing MAC address or appName');
    setError('Invalid or missing MAC address or app name');
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) return <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"><div className="text-gray-100">Loading...</div></div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Unauthorized');

      const response = await fetch(DELETE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress, appName }),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          throw new Error(data.error || 'Failed to delete app');
        } catch {
          throw new Error(`Server returned non-JSON response: ${text.slice(0, 50)}...`);
        }
      }

      setError('');
      navigate(`/dashboard?macAddress=${macAddress}`);
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-md w-full p-6 border border-blue-300"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-800">Delete App: {appName}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`/dashboard?macAddress=${macAddress}`)}
            className="text-gray-600 hover:text-red-600"
            aria-label="Close"
          >
            <X size={24} />
          </motion.button>
        </div>
        <p className="text-gray-700 mb-6">Are you sure you want to delete <strong>{appName}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/dashboard?macAddress=${macAddress}`)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className={`flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-medium ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Trash2 size={18} />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </motion.button>
        </div>
        {error && (
          <motion.p
            className="text-red-600 mt-4 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppDeleteModal;