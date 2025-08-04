import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../configSupabase/config';

const AppDeleteModal = ({ macAddress, appName, onClose, onDelete }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      const cleanMac = macAddress.toLowerCase().replace(/:/g, '');

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('AppDeleteModal: Auth error:', authError?.message || 'No user');
        throw new Error('Unauthorized: Please sign in');
      }

      // Delete from device_${macAddress} table
      const { error: deleteError } = await supabase
        .from(`device_${cleanMac}`)
        .delete()
        .eq('app_name', appName);

      if (deleteError) {
        console.error('AppDeleteModal: Delete error:', deleteError.message);
        throw new Error(`Failed to delete app: ${deleteError.message}`);
      }

      // Delete from public_apps if it exists
      const { error: publicDeleteError } = await supabase
        .from('public_apps')
        .delete()
        .eq('app_name', appName)
        .eq('mac_address', cleanMac)
        .eq('user_id', user.id);
      if (publicDeleteError) {
        console.warn('AppDeleteModal: Public delete error:', publicDeleteError.message);
      }

      // Delete file from storage
      const filePath = `${user.id}/${cleanMac}/${appName}.py`;
      const { error: storageError } = await supabase.storage
        .from('apps')
        .remove([filePath]);
      if (storageError) {
        console.warn('AppDeleteModal: Storage delete error:', storageError.message);
      }

      if (typeof onDelete === 'function') {
        onDelete();
      } else {
        console.error('AppDeleteModal: onDelete is not a function', onDelete);
      }
      onClose();
    } catch (err) {
      console.error('AppDeleteModal: Error:', err.message);
      setError(err.message);
      setIsDeleting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-blue-50/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Delete App: {appName}
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this app? This action cannot be undone.
        </p>
        {error && (
          <motion.p
            className="text-red-600 mb-4 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        <div className="flex justify-end gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg font-medium shadow-md hover:bg-blue-200"
          >
            <X className="w-5 h-5 inline-block mr-2" />
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: isDeleting ? 1 : 1.05 }}
            whileTap={{ scale: isDeleting ? 1 : 0.95 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-lg font-medium text-white shadow-md ${
              isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <Trash2 className="w-5 h-5 inline-block mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppDeleteModal;
